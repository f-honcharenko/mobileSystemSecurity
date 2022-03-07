import { promiseTimeout } from '@vueuse/core'
import { Service, ApiModel } from './base'
import { api } from '/@src/composable/useApi'

export class NoteModel extends ApiModel {
    constructor() {
        const fields: Array<string> = [
            "creator",
            "title",
            "content",
            "createdAt"
        ]
        super(fields)
    }
}


export class NoteService extends Service<NoteModel> {
    constructor() {
        super('/', new NoteModel(), api)
    }
    public async create(instance: NoteModel): Promise<NoteModel> {
        try { 
            const data = await this._api.post('/note/create', {title:instance.apiData().title, content:instance.apiData().content})
            console.log('do pasrsinga', data);
            return Promise.resolve(this.parseData(data));
        } catch (error) {
            return Promise.reject(error)
        }
    }
    public async get():Promise<NoteModel> { 
        console.log("[SERVICE] get");
        try { 
            const { data } = await this._api.get(`/user/token/`)
            this._session.user = data.user;
            this._session.access_token = data.token;
            return Promise.resolve(data.user)
        } catch (error:any) { 
            if(error.response && error.response.status === 401){
                // this.logout()
            }
            if(error.response)
                return Promise.reject(error.response)
            return Promise.reject(error)
        }  
    }
}