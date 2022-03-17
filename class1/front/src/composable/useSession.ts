import { InjectionKey, ref, computed, inject, reactive } from 'vue'
import { useStorage } from '@vueuse/core'

export const userSessionSymbol: InjectionKey<Object> = Symbol()

export interface UserSessionData {
    publicKey: any,
    access_token: string,
    access_token_timestamp: number | null,
    isLoggedIn: boolean,
    user: any,
}

export function initUserSession():UserSessionData {
    const access_token = useStorage('access_token', '')
    const access_token_timestamp = useStorage('access_token_timestamp', null)
    const publicKey = useStorage('publicKey', null)
    const user = useStorage('user', null)
    const isLoggedIn = useStorage('isLoggedIn', false)

    return reactive({
        publicKey,
        access_token,
        access_token_timestamp,
        isLoggedIn,
        user,
        }) 
    }
export function useUserSession() {
    const userSession = inject(userSessionSymbol)
    if (!userSession) {
        throw new Error('UserSession not properly injected in app')
    }
    return userSession
  }