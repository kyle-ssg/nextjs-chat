import {NextApiRequest, NextApiResponse} from "next";

import {getDB} from "server/connect"
import {Message} from "server/schemas";
import {pagedResponse} from "server/paged-response";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";
import Project from "common/project";
import getInternalChannelName from "../../../../server/getInternalChannelName";
import {elementType} from "prop-types";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB();
        let user:IUserBase;
        try {
            user = await verify(req.headers.authorization?.split(" ")[1])
        } catch(e){}
        if (Project.adminOnlyRooms.includes(`${req.query.channel}`)
            || Project.adminVoiceOnlyRooms.includes(`${(`${req.query.channel}`).replace("voice-","")}`) ) {
            try {
                const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
                if (!user?.role.includes("ADMIN")) {
                   return  res.status(403).json({message:"You need to be admin to view this"})
                }
            } catch (e) {
                return res.status(403).json({message:"You need to be admin to view this"})
            }
        }
        const channel = getInternalChannelName(`${req.query.channel}`, user?._id);
        if (channel.includes("private-") &&!user) {
            return res.status(500).json({message: "Attempting to get private messages whilst not logged in"})
        }
        const messages = await Message.find({channel}, null, {limit:100, sort: {createdAt:1}}).exec();
        res.status(200).json(pagedResponse(messages))
    } catch (e) {
        res.status(500).json(e?.message ? {message:e.message} : e)
    }
}
