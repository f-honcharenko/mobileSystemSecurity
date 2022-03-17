import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hash(password: string): Promise<string> { 
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return Promise.resolve(hash);
    } catch (error) { 
        error.status = 400;
        return Promise.reject(error)
    }
};
export async function compare(password: string, hash: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(password,hash)
        return Promise.resolve(result);
    } catch (error) { 
        error.status = 400;
        return Promise.reject(error)
    }
};
