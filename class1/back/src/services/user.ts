import { UserSchema, UserModel } from "../models/User";
import jwt from 'jsonwebtoken'
import config from '../../config/dev'
import { HashService } from './crypto'

const hashService = new HashService();

interface ResponseError extends Error {
    status?: number;
}

export class UserService { 
    public async create(candidate:UserModel):Promise<{user:UserModel, token:string}> {
        try {
            if (candidate.login && candidate.password && (candidate.login.length > 0) && (candidate.password.length > 0)) {
                candidate.password = await hashService.hash(candidate.password);
                const user = await new UserSchema(candidate).save();
                const userData = {
                    login: user.login,
                    createdAt: user.createdAt,
                    id: user._id,
                };
                const token = await jwt.sign(userData, config.secretJWT, {})
                return Promise.resolve({ token, user: userData });
            } else { 
                let newError:ResponseError = new Error("Incorrect data");
                newError.status = 400;
                return Promise.reject(newError);
            }
        } catch (error) {
            if (error.keyPattern.login) { 
                let newError:ResponseError = new Error("User already exist");
                newError.status = 400;
                return Promise.reject(newError);
            };
            error.status = 500;
            return Promise.reject(error);
        }
    }
    public async login(candidate: UserModel): Promise<Object> { 
        try {
            if (candidate.login && candidate.password && (candidate.login.length > 0) && (candidate.password.length > 0)) {
                const user = await UserSchema.findOne({ login: candidate.login }).exec();
                const isPasswordCompared = await hashService.compare(candidate.password, user.password );
                if (user && (isPasswordCompared)) {
                    const userData = {
                        login: user.login,
                        createdAt: user.createdAt,
                        id: user._id,
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
    public async token(token: String): Promise<Object> { 
        try { 
            const userData = await jwt.verify(token, config.secretJWT, {});
            return Promise.resolve({ token, user: userData });
        } catch (error) { 
            error.status = 500;
            return Promise.reject(error);
        }
    }
    public async changePassword(token: string, oldPassword:string, newPassword:string): Promise<Object> {
        try {
            const userData = await jwt.verify(token, config.secretJWT, {});
            const user = await UserSchema.findOne({ login: userData.login }).exec();
            const isPasswordCompared = await hashService.compare(oldPassword, user.password );
            if (isPasswordCompared) {
                if (newPassword.length > 0) {
                    user.password = await hashService.hash(newPassword);;
                    const newUser = await user.save();
                    return Promise.resolve({ token, user: userData });
                } else { 
                    let newError:ResponseError = new Error("Incorrect new password");
                    newError.status = 400;
                    return Promise.reject(newError);
                }
            } else { 
                let newError:ResponseError = new Error("Passwords do not match");
                newError.status = 400;
                return Promise.reject(newError);
            }
        } catch (error) { 
            error.status = 500;
            return Promise.reject(error);
        }
    }
}