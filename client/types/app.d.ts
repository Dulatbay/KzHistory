declare global {
    declare type RootState = import('@/app/store/appStore').RootState
    declare type AppDispatch = import('@/app/store/appStore').AppDispatch
    export type Brand<K, T> = K & { [_brand]: T }
    export type Id = number
    export type Email = string
}
export {}