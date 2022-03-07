import express from 'express';
import { NoteService } from '../services/note';

const note = express.Router(); 
const noteService = new NoteService();

note.post('/create', async (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7);
        const title = req.body.title;
        const content = req.body.content;
        const data = await noteService.create(token, {title,content});

        return next(Promise.resolve({ data, status: 200 }));
    } catch (error) {
        return next(error)
    } 
});


export default note;