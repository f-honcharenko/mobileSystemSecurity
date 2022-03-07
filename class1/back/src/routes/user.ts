import express from 'express';
import { UserService } from '../services/user';

const user = express.Router();
const userService = new UserService();

user.post('/create', async (req, res, next) => {
    try {
        const login = req.body.login || null;
        const password = req.body.password || null;

        const user = await userService.create({ login, password });
        return next(Promise.resolve({ data: user, status: 201 }));
    } catch (error) {
        return next(error)
    } 
});

user.post('/login', async (req, res, next) => {
    try {
        const login = req.body.login || null;
        const password = req.body.password || null;

        const data = await userService.login({ login, password });

        return next(Promise.resolve({ data, status: 200 }));
    } catch (error) {
        return next(error)
    } 
});
user.get('/token', async (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7);
        const data = await userService.token(token);
        console.log('token',token);
        console.log('data',data);
        return next(Promise.resolve({ data, status: 200 }));
    } catch (error) {
        return next(error)
    } 
});


export default user
