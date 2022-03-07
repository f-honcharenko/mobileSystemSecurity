import { NoteSchema, NoteModel } from '../models/Note';
import jwt from 'jsonwebtoken'
import config from '../../config/dev'

interface ResponseError extends Error {
    status?: number;
}

export class NoteService {
    public async create(token: string, note: NoteModel): Promise<NoteModel> {
        
        console.log('token',token);
        try {
            if (note.title && note.content && token) {
                const userData = await jwt.verify(token, config.secretJWT, {});
                note.creator = userData.id;
                const data = await new NoteSchema(note).save();

                return Promise.resolve(data);
            } else { 
                let newError:ResponseError = new Error("Incorrect data");
                newError.status = 400;
                return Promise.reject(newError);
            }
            return Promise.resolve(new NoteSchema());
        } catch (error) {
            error.status = 500;
            return Promise.reject(error);
        }
    }
}