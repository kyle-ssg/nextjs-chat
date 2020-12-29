import {Document} from "mongoose";

export interface IUserBase {
    avatar: string,
    bio: string,
    createdAt?: string,
    lastActive?: string,
    activeRoom?: string,
    _id?: string,
    online?: boolean,
    updatedAt?: string,
    token?: string,
    role: string
    username: string,
}
export interface IMessageBase {
    _id?:string,
    username: string,
    channel?: string,
    avatar: string,
    messageType: string,
    createdAt?: string,
    text: string
}

export interface IUser extends Document, IUserBase{
    _id: string
}

export interface IMessage extends Document, IMessageBase{
    _id: string
}

export type PagedResponse<T>  = {
    data: T[]
}
