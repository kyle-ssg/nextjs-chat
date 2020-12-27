import mongoose, {Schema} from "mongoose";
import {IMessage, IUser} from "../models";

export const User = global.User = global.User || mongoose.model<IUser>("user", new Schema({
    name: {type:String, unique:true},
    bio: String,
    createdAt: { type: Date, default: Date.now },
    avatar: String
}));

export const Message = global.Message = global.Message || mongoose.model<IMessage>("message", new Schema({
    text: String,
    name: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
}));
