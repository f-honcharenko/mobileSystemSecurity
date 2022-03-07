import { Service, ApiModel } from './base'
import { api } from '/@src/composable/useApi'

export class UserModel extends ApiModel {
    constructor() {
        const fields: Array<string> = [
            "login",
            "password",
            "token",
            "createdAt"
        ]
        super(fields)
    }
}


export class AuthService extends Service<UserModel> {
    constructor() {
        super('/', new UserModel(), api)
    }

    public async login(user: UserModel): Promise<Object> {
        console.log("[SERVICE] login");
        try {
            const { data } = await this._api.post(`/user/login/`,{"login":user.apiData().login,"password":user.apiData().password})
            this._session.access_token = data.token;
            // this._session.refresh_token = data.refresh
            this._session.access_token_timestamp = (new Date()).getTime()
            this._session.isLoggedIn = true;
            this._session.user = JSON.stringify(data.user);
            return Promise.resolve(this.parseData(data.user))
        } catch (error:any) {
            if(error.msg)
                return Promise.reject(error.msg)
            return Promise.reject(error)
        }
    }
    public async register(user: UserModel):Promise<Object> {
        console.log("[SERVICE] register");
        try {
            const { data } = await this._api.post(`/user/create/`,{"login":user.apiData().login,"password":user.apiData().password})
            this._session.user= data.user
            this._session.access_token = data.token
            // this._session.refresh_token = data.tokens.refresh
            this._session.access_token_timestamp = (new Date()).getTime()
            
            return Promise.resolve(data.user)
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return Promise.reject(error)
        }
    }
    public async get():Promise<UserModel> { 
        console.log("[SERVICE] get");
        try { 
            // const { data } = await this._api.get(`/frontend/user/?t=${(new Date()).getTime()}`)
            // this._session.user = data;
            // return Promise.resolve(data)
            return Promise.resolve(new UserModel())
        } catch (error:any) { 
            if(error.response && error.response.status === 401){
                this.logout()
            }
            if(error.response)
                return Promise.reject(error.response)
            return Promise.reject(error)
        }  
    }

    public async logout() { 
        console.log("[SERVICE] logout");
        this._session.access_token = ''
        this._session.isLoggedIn = false;
        this._session.user = {} 
    }
}