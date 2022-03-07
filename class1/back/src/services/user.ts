import { UserSchema, UserModel } from "../models/User";
import jwt from 'jsonwebtoken'
import config from '../../config/dev'
// import user

interface ResponseError extends Error {
    status?: number;
}

export class UserService { 
    public async create(candidate:UserModel):Promise<{user:UserModel, token:string}> {
        try {
            if (candidate.login && candidate.password && (candidate.login.length > 0) && (candidate.password.length > 0)) {
                const user = await new UserSchema(candidate).save();
                const userData = {
                    login: user.login,
                    createdAt: user.createdAt
                };
                const token = await jwt.sign(userData, config.secretJWT, {})
                return Promise.resolve({ token, user: userData });
            } else { 
                let newError:ResponseError = new Error("Incorrect data");
                newError.status = 400;
                return Promise.reject(newError);
            }
        } catch (error) {
            console.log(error);
            if (error.keyPattern.login) { 
                let newError:ResponseError = new Error("User already exist");
                newError.status = 400;
                return Promise.reject(newError);
            };
            error.status = 500;
            return Promise.reject(error);
        }
    }
    public async login(candidate: UserModel): Promise<{user:UserModel, token:string}> { 
        try {
            if (candidate.login && candidate.password && (candidate.login.length > 0) && (candidate.password.length > 0)) {
                const user = await UserSchema.findOne({ login: candidate.login }).exec();

                if (user && (user.password == candidate.password)) {
                    const userData = {
                        login: user.login,
                        createdAt: user.createdAt,
                    };
                    const token = await jwt.sign(userData, config.secretJWT, {})
                    return Promise.resolve({ token, user: userData });
                } else { 
                    let newError:ResponseError = new Error("Incorrect password");
                    newError.status = 401;
                    return Promise.reject(newError);
                }
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
    public async token(token: String): Promise<{ user: UserModel, token: String }> { 
        try { 
            const userData = await jwt.verify(token, config.secretJWT, {});
            console.log(userData);
                return Promise.resolve({ token, user: userData });


        } catch (error) { 

        }
    }
    // public async changePassword(candidate: UserModel): Promise<{user:UserModel, token:string}> { }
}