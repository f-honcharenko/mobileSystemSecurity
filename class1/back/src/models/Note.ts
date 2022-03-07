import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

export interface NoteModel {
    title: string;
    content?: string;
    creator?: mongoose.ObjectId;
    createdAt?: Date;
}
const schema = new Schema<NoteModel>({
    title: { type: String, required: true},
    content: { type: String, required: false },
    creator: { type: mongoose.Types.ObjectId, required: true }
},  { timestamps: true });

export const NoteSchema = model<NoteModel>('Note', schema);