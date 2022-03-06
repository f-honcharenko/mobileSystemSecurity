import { reactive } from 'vue'
import { AxiosInstance, AxiosResponse } from 'axios'
import { api,session } from '/@src/composable/useApi'
import { DataMixin } from '/@src/types/DataMixin'


export class ApiModel {
    data!: DataMixin | null
    public id!: number | null
    state = reactive<any>({})
    fields:Array<string> = []

    constructor(fields:Array<string>) {
        this.fields = fields
        fields.forEach(field => {
            this.state[field] = null
            Object.defineProperty(this, field, {
                get: () => this.state[field],
                set: (value) => this.state[field] = value
            });
        });
    }
    public getData():DataMixin {
        return this.state
    }

    public apiData():DataMixin {
        // create object with only form fields without additional data
        return Object.keys(this.state).reduce((prev:object, currValue:string) => {
            if(this.fields.includes(currValue))
                return { ...prev, ...{[currValue]: this.state[currValue]}}
            return prev    
        }, {})
    }

    public parseData(data:AxiosResponse['data']|object):ThisType<ApiModel> {
        this.data = data
        this.id = data.id
        for (const property in data) {
            this.state[property] = data[property]
        }
        return this
    }
}

export class Service<Model extends ApiModel> {
    _api = api;
    _session = session;
    _apiRoute:string
    _model:Model

    _routes = {
        concreate : (apiRoute:string, id:string|number) => `${apiRoute}/${id}/`,
        list : (apiRoute:string) => `${apiRoute}s/`,
        create : (apiRoute:string) => `${apiRoute}/`,
        update : (apiRoute:string, id:string|number|null) => `${apiRoute}/${id}/`,
        upgrade : (apiRoute:string, id:string|number|null) => `${apiRoute}/${id}/`,
        remove : (apiRoute:string, id:string|number|null) => `${apiRoute}/${id}/`,
    }
    
    constructor(path:string, model:Model, api?:AxiosInstance) {
        if (this.constructor == Service)
            throw new Error("Abstract classes can't be instantiated.")
        if (api)
            this._api = api
        this._apiRoute = path
        this._model = model
    }

    public parseData(data:AxiosResponse['data']|object) {
        // @ts-ignore
        const instance = new this._model.constructor()
        return instance.parseData(data)
    }

    public async get(id:number):Promise<Model> {
        try {
            const data  = await this._api.get(this._routes.concreate(this._apiRoute, id))
            // @ts-ignore
            const instance = new this._model.constructor()
            instance.parseData(data)
            return Promise.resolve(instance)
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return error
        }
    }

    public async list(params:any={}):Promise<{ list:Array<Model>, count:number}> {
        try {
            const { data } = await this._api.get(this._routes.list(this._apiRoute),{ params:params })
            return Promise.resolve({
                list:data.results.map((item:any) => this.parseData(item)),
                count:data.count
            })
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return error
        }
    }

    public async create(instance:Model):Promise<Model> {
        try {
            const { data } = await this._api.post(this._routes.create(this._apiRoute), instance.apiData())
            instance.parseData(data)
            return Promise.resolve(instance)
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return error
        }
    }

    public async update(instance:Model):Promise<Model> {
        try {
            await this._api.put(this._routes.update(this._apiRoute, instance.id), instance.apiData())
            // @ts-ignore
            return Promise.resolve(await this.get(instance.id))
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return error
        }
    }

    public async upgrade(instance:Model, data:any):Promise<Model> {
        try {
            await this._api.patch(this._routes.upgrade(this._apiRoute, instance.id), data)
            // @ts-ignore
            return Promise.resolve(await this.get(instance.id))
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return error
        }
    }

    public async delete(instance:Model):Promise<void> {
        try {
            await this._api.delete(this._routes.remove(this._apiRoute, instance.id))
            return Promise.resolve()
        } catch (error:any) {
            if(error.response)
                return Promise.reject(error.response)
            return error
        }
    }

    public get api():AxiosInstance {
        return this._api
    }

    public get apiRoute():string {
        return this._apiRoute
    }

}