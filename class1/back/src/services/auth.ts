import express from 'express';

const auth = express.Router();

auth.get('/ping/', async (req, res, next) => {
    try {
        return next(Promise.resolve({ data: { msg:'pong'}, status:200 }));
    }catch (error) {
        return next(error);
    } 
});

export default auth
