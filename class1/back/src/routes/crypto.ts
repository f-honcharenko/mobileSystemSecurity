import express from 'express';
import { rsaService } from '../services/crypto';

const crypto = express.Router(); 


crypto.get('/publicKey', async (req, res, next) => {
    try {
        return next(Promise.resolve({ data: { publicKey:rsaService.publicKey }, status: 200 }));
    } catch (error) {
        return next(error)
    } 
});

export default crypto;

