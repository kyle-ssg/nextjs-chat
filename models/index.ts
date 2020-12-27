import {Document} from "mongoose";

export interface IUser extends Document{
    name: string,
    bio: string,
    createdAt: string,
    avatar: string
}

export interface IMessage extends Document{
    name: string,
    avatar: string,
    createdAt?: string,
    text: string
}

export type PagedResponse<T>  = {
    data: T[]
}
