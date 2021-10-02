export interface Payload {
    id?: string,
    [key: string]: any
}

export interface FreshOptions {
    payload: Payload,
    [option: string]: any
}