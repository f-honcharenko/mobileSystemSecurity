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
            const {data} = await this._api.post('/note/create', {title:instance.apiData().title, content:instance.apiData().content})
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error)
        }
    }

    public async all(): Promise<{list:Array<NoteModel>, count:number}> {
        try { 
            const data = await this._api.get('/note/list')
            return Promise.resolve(data.data);
        } catch (error) {
            return Promise.reject(error)
        }
    }
    public async getNote(id:string):Promise<NoteModel> { 
        console.log("[SERVICE] get");
        try { 
            const { data } = await this._api.get(`/note/${id}/`)
            return Promise.resolve(data)
        } catch (error:any) { 
            if(error.response && error.response.status === 401){
                // this.logout()
            }
            if(error.response)
                return Promise.reject(error.response)
            return Promise.reject(error)
        }  
    }
    public async update(instance: NoteModel): Promise<NoteModel> {
        try { 
            const data = await this._api.post(`/note/update/${instance._id}/`, {title:instance.title, content:instance.contnent})
            return Promise.resolve(data.data);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}