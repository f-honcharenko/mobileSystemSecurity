import { InjectionKey, ref, computed, inject, reactive } from 'vue'
import { useStorage } from '@vueuse/core'

export const userSessionSymbol: InjectionKey<Object> = Symbol()

export interface UserSessionData {
    refresh_token: string,
    access_token: string,
    access_token_timestamp: number | null,
    isLoggedIn: boolean,
    user: any,
}
  
export function initUserSession():UserSessionData {
    const refresh_token = useStorage('refresh_token', '')
    const access_token = useStorage('access_token', '')
    const access_token_timestamp = useStorage('access_token_timestamp', null)
    const user = useStorage('user', null)
    const isLoggedIn = computed(() => Boolean(access_token.value))

    return reactive({
        refresh_token,
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