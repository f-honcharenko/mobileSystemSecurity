import { Service, ApiModel } from './base'
import { api } from '/@src/composable/useApi'

export class UserModel extends ApiModel {
    constructor() {
        const fields: Array<string> = [
            "login",
            "password",
            "token"
        ]
        super(fields)
    }
}


export class AuthService extends Service<UserModel> {
    constructor() {
        super('/frontend/', new UserModel(), api)
    }

    public async login(user: UserModel): Promise<Object> {
        console.log("[SERVICE] login");
        try {
            const { data } = await this._api.post(`/token/`,{"login":user.apiData().login,"password":user.apiData().password})
            this._session.access_token = data.access
            this._session.refresh_token = data.refresh
            this._session.access_token_timestamp = (new Date()).getTime()
            const userData = await this.get();
            return Promise.resolve(this.parseData(userData))
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return Promise.reject(error)
        }
    }
    public async register(user: UserModel):Promise<Object> {
        console.log("[SERVICE] register");
        try {
            const { data } = await this._api.post(`/frontend/register/`,{"login":user.apiData().login,"password":user.apiData().password})
            this._session.user= data.user
            this._session.access_token = data.tokens.access
            this._session.refresh_token = data.tokens.refresh
            this._session.access_token_timestamp = (new Date()).getTime()
            
            const userData = await this.get();
            return Promise.resolve(userData)
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return Promise.reject(error)
        }
    }
    public async get():Promise<UserModel> { 
        console.log("[SERVICE] get");
        try { 
            const { data } = await this._api.get(`/frontend/user/?t=${(new Date()).getTime()}`)
            this._session.user = data;
            return Promise.resolve(data)
        } catch (error:any) { 
            if(error.response && error.response.status === 401){
                this.logout()
            }
            if(error.response)
                return Promise.reject(error.response)
            return Promise.reject(error)
        }  
    }
    public async edit (user: UserData):Promise<Object> {
        console.log("[SERVICE] edit");
        try {
            const { data } = await this._api.put(`/frontend/user/${this._session.user.id}/`, user);
            
            return Promise.resolve(data)
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return Promise.reject(error)
        }
    }
    public async logout() { 
        console.log("[SERVICE] logout");
        this._session.access_token = ''
        this._session.refresh_token = ''
        this._session.user = {} 
    }
}