import { Schema, model } from 'mongoose';

export interface UserModel {
    login: string;
    password?: string;
    createdAt?: Date;
    token?: String;
}
const schema = new Schema<UserModel>({
    login: { type: String, unique: true, required: true, },
    password: { type: String, required: true }
},  { timestamps: true });

export const UserSchema = model<UserModel>('User', schema);