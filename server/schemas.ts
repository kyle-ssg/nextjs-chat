import mongoose, {PassportLocalModel, Schema} from "mongoose";
import {IMessage, IUserBase, IUser} from "../models";
import passportLocalMongoose from 'passport-local-mongoose';

let shouldAddPlugin = !global.User;
// @ts-ignore

const UserSchema = new Schema({
    username: {type:String, unique:true},
    bio: String,
    role: {type:String, default:"USER"},
    createdAt: { type: Date, default: Date.now },
    avatar: String
});
UserSchema.plugin(passportLocalMongoose)
export const User:PassportLocalModel<IUser> = global.User = global.User || mongoose.model<IUser>("user", UserSchema);


export const Message = global.Message = global.Message || mongoose.model<IMessage>("message", new Schema({
    text: String,
    name: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
}));
