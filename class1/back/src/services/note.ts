import { NoteSchema, NoteModel } from '../models/Note';
import jwt from 'jsonwebtoken'
import config from '../../config/dev'
import note from 'src/routes/note';

interface ResponseError extends Error {
    status?: number;
}

export class NoteService {
    public async create(token: string, note: NoteModel): Promise<NoteModel> {
        try {
            if (note.title && token) {
                const userData = await jwt.verify(token, config.secretJWT, {});
                note.creator = userData.id;
                const data = await new NoteSchema(note).save();

                return Promise.resolve(data);
            } else { 
                let newError:ResponseError = new Error("Incorrect data");
                newError.status = 400;
                return Promise.reject(newError);
            }
        } catch (error) {
            error.status = 500;
            return Promise.reject(error);
        }
    }
    public async list(token: string): Promise<{ list: Array<NoteModel>, count: number }> { 
        try { 
            const userData = await jwt.verify(token, config.secretJWT, {});
            const notes = await NoteSchema.find({ creator: userData.id });
            return Promise.resolve({list:notes, count:notes.length})
        } catch (error) {
            error.status = 500;
            return Promise.reject(error);
        }
    }
    public async get(token: string, id:string): Promise<NoteModel> { 
        try { 
            const userData = await jwt.verify(token, config.secretJWT, {});
            const note = await NoteSchema.findById(id);
            if (note.creator == userData.id) { 
                return Promise.resolve(note)
            } else {
                let newError:ResponseError = new Error("Not found");
                newError.status = 404;
                return Promise.reject(newError);
            }
        } catch (error) {
            error.status = 500;
            return Promise.reject(error);
        }
    }
    public async update(token: string, id:string, instance:NoteModel): Promise<NoteModel> { 
        try { 
            const userData = await jwt.verify(token, config.secretJWT, {});
            const note = await NoteSchema.findById(id);
            if (note.creator == userData.id) { 
                note.title = instance.title;
                note.content = instance.content;
                const newNote = await note.save();
                return Promise.resolve(newNote)
            } else {
                let newError:ResponseError = new Error("Not found");
                newError.status = 404;
                return Promise.reject(newError);
            }
        } catch (error) {
            error.status = 500;
            return Promise.reject(error);
        }
    }
}