import {NextApiRequest, NextApiResponse} from "next";
import {getDB} from "server/connect";
import {Message, Private} from "server/schemas";
import {pagedResponse} from "server/paged-response";
import {verify} from "server/jwt-handler";
import {IMessage, IMessageBase, IUserBase} from "models";
import getFromTo from "../../../../server/getFromTo";
import getInternalChannelName from "../../../../server/getInternalChannelName";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB()
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);

        let channel = getInternalChannelName(`${req.query.channel}`, user._id);

        const data:IMessageBase = {
            avatar:user.avatar,
            username:user.username,
            channel,
            messageType:req.body.messageType || "TEXT",
            ...req.body
        }

        new Message(data).save((err)=>{
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).send({ok:1})
            }
        });

        if (channel.includes("private-")) {
            console.log("ITS PRIVATE", channel.split("private-")[1], channel)
            const [from,to] = getFromTo(user._id, `${req.query.channel}`.split("private-")[1] )
            console.log(from,to)
            await Private.findOne({
                from,
                to
            },async (_, existingThread)=>{
                if(!existingThread) {
                    console.log("Creating new private", {from,to})
                    await new Private({from,to}).save()
                }
            });
        }

    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }
}
