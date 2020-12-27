import {NextApiRequest, NextApiResponse} from "next";
import {getDB} from "server/connect";
import {Message} from "server/schemas";
import {pagedResponse} from "server/paged-response";
import {verify} from "server/jwt-handler";
import {IMessage, IMessageBase, IUserBase} from "models";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB()
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
        const data:IMessageBase = {
            avatar:user.avatar,
            username:user.username,
            channel: `${req.query.channel}`,
            messageType:req.body.messageType || "TEXT",
            text:req.body.text,
        }

        new Message(data).save((err)=>{
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).send({ok:1})
            }
        })
    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }
}
