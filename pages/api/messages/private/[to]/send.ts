import {NextApiRequest, NextApiResponse} from "next";
import {getDB} from "server/connect";
import {Message, Private} from "server/schemas";
import {verify} from "server/jwt-handler";
import {IMessage, IMessageBase, IUserBase} from "models";
import getFromTo from "../../../../../server/getFromTo";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB()
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
        const [from,to] = getFromTo(user._id, `${req.query.to}`);
        const existingThread = await Private.find({
            from,
            to
        });
        if(!existingThread) {
            await new Private({from,to}).save()
        }
        const data:IMessageBase = {
            avatar:user.avatar,
            username:user.username,
            messageType:req.body.messageType || "TEXT",
            ...req.body,
            from,
            to
        }
        await new Message(data).save((err)=>{
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).send({ok:1})
            }
        });
    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }
}
