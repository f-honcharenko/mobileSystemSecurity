import bcrypt from 'bcrypt';
import rsa from 'js-crypto-rsa';
import { JsonWebKeyPair } from 'js-crypto-rsa/dist/typedef';


class RSAService { 
    public privateKey:JsonWebKey;
    public publicKey:JsonWebKey;
    
    public async init(): Promise<JsonWebKeyPair> { 
        try {
            const keys = await rsa.generateKey(2048);
            this.privateKey = keys.privateKey;
            this.publicKey = keys.publicKey;
            return Promise.resolve(keys);
        } catch (error) { 
            error.status = 500;
            return Promise.reject(error)
        }
    }

    public async decrypt(encrypted):Promise<Object> { 
        try {
            const data = await rsa.decrypt(encrypted, this.privateKey);
            console.log(data);
            return Promise.resolve(data);
        } catch (error) { 
            error.status = 400;
            return Promise.reject(error)
        }
    }
}
export class HashService{
    private saltRounds = 10;
    
    public async hash(password: string): Promise<string> { 
        try {
            const hash = await bcrypt.hash(password, this.saltRounds);
            return Promise.resolve(hash);
        } catch (error) { 
            error.status = 400;
            return Promise.reject(error)
        }
    };
    public async compare(password: string, hash: string): Promise<boolean> {
        try {
            const result = await bcrypt.compare(password,hash)
            return Promise.resolve(result);
        } catch (error) { 
            error.status = 400;
            return Promise.reject(error)
        }
    };
}
export const rsaService = new RSAService();
