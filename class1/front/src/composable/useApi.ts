import { InjectionKey, inject } from 'vue'
import axios,{ AxiosInstance }  from 'axios'

import { UserSessionData, initUserSession } from './useSession';

export const apiSymbol: InjectionKey<AxiosInstance> = Symbol()

export function initApi(session: UserSessionData) {
    const api = axios.create({
      baseURL: `${import.meta.env.VITE_API_ROOT}/api/`,
      headers: {
          'Content-Type': 'application/json',
        },
    })
  
    api.interceptors.request.use(async (config:any) => {
      try {
        const access_token = await fetchAccessToken();
        config.headers.common.Authorization  = `Bearer ${access_token}`;  

        if (config.params == undefined) { 
          config.params = {}
        } 
        config.params['t'] = (new Date()).getTime();
        return config
      } catch (error) {

      }
    })
  
    api.interceptors.response.use(
      response => {
        if (response.data && response.data.success === false) {
          return Promise.reject(response)
        }
        return Promise.resolve(response)
      },
      error => {
        console.log(error)
        if (error.request && error.request.status === 500) {
          return Promise.reject(error)
        }else if(error.request && error.request.status === 401){
          // document.location.href = '/logout'
        }else{
          return Promise.reject(error)
        }
    })
    
    const fetchAccessToken = async(): Promise<string>=> {    
      const current_timestamp = (new Date()).getTime()
      const access_timestamp = session.access_token_timestamp;

      // if token lifetime < 5 min
      if (Math.abs((current_timestamp - Number(access_timestamp)) / 1000) < 5*60) {
        return Promise.resolve(session.access_token)
      }
      
      if (Boolean(session.refresh_token)) { 
        try {
          const response = await axios.post(
              `${import.meta.env.VITE_API_ROOT}/api/token/refresh/`,
              { "refresh": session.refresh_token })
          session.access_token = response.data.access
          session.access_token_timestamp = (new Date()).getTime()
          return Promise.resolve(session.access_token)
        } catch (error:any) {
            console.log("[useAPI] fetchAT error");
            // document.location.href = '/logout'
        }
      }
      return Promise.resolve("TOKEN")
    }

    return api
}


export function useApi() {
    const api = inject(apiSymbol)
    if (!api) {
        throw new Error('Api not properly injected in app')
    }
    return api
}

export const session = initUserSession();
export const api = initApi(session);