import mongoose, {Model, PassportLocalModel, Schema} from "mongoose";
import {IMessage, IUserBase, IUser, IPrivate} from "models";
import passportLocalMongoose from "passport-local-mongoose";
import {signToken} from "./jwt-handler";

// @ts-ignore
let shouldAddPlugin = !global.User;
// @ts-ignore

const UserSchema = new Schema({
    username: {type:String, unique:true},
    bio: String,
    role: {type:String, default:"USER"},
    lastActive: { type: Date, default: Date.now },
    activeRoom: String,
    activeVoiceRoom: String,
    avatar: String
}, {
    timestamps: true
});
UserSchema.plugin(passportLocalMongoose)
// @ts-ignore
export const User:PassportLocalModel<IUser> = global.User = global.User || mongoose.model<IUser>("user", UserSchema);

export function parseUser(user:IUser, withToken?:boolean) {
    const dto = {
        _id: user._id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        avatar: user.avatar,
        bio: user.bio
    }
    if (withToken){
        return {
            ...dto,
            token: signToken(dto)
        }
    } else {
        return dto
    }
}
// @ts-ignore
export const Message: Model<IMessage> = global.Message = global.Message || mongoose.model<IMessage>("message", new Schema({
    text: String,
    name: String,
    channel: {type: String, required:true},
    username: {type: String, required:true},
    localId: {type: String, required:true},
    avatar: String,
    messageType: { type: String, default: "TEXT" },
}, {
    timestamps: true,
    capped: { size: 102400000, max: 100000000, autoIndexId: true }
}));

// @ts-ignore
export const Private:Model<IPrivate> = global.Private = global.Private || mongoose.model<IPrivate>("private", new Schema({
    from: {type: String, required:true},
    to: {type: String, required:true},
    lastUpdated: {type:Date, default:Date.now}
}, {}));
