import {Document} from "mongoose";

export interface IUserBase {
    avatar: string,
    bio: string,
    createdAt?: string,
    token?: string,
    role: string
    username: string,
}

export interface IUser extends Document, IUserBase{}

export interface IMessage extends Document{
    name: string,
    avatar: string,
    messageType: string,
    createdAt?: string,
    text: string
}

export type PagedResponse<T>  = {
    data: T[]
}