import {NextApiRequest, NextApiResponse} from "next";

import {getDB} from "server/connect"
import {Message} from "server/schemas";
import {pagedResponse} from "server/paged-response";
import {IUserBase} from "../../../../models";
import {verify} from "../../../../server/jwt-handler";
import Project from "../../../../common/project";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        if (Project.adminOnlyRooms.includes(`${req.query.channel}`) || Project.adminVoiceOnlyRooms.includes(`${req.query.channel.replace("voice-","")}`) ) {
            try {
                const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
                if (user?.role !== 'ADMIN') {
                   return  res.status(403).json({message:"You need to be admin to view this"})
                }
            } catch (e) {
                return res.status(403).json({message:"You need to be admin to view this"})
            }
        }
        const messages = await Message.find({channel: req.query.channel}, null, {limit:100, sort: {createdAt:1}}).exec();
        res.status(200).json(pagedResponse(messages))
    } catch (e) {
        res.status(500).json(e?.message ? {message:e.message} : e)
    }
}
