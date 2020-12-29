import type { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import {getDB} from "server/connect"
import {Message} from "server/schemas";
import {pagedResponse} from "server/paged-response";
import getInternalChannelName from "../../../../../server/getInternalChannelName";
import {verify} from "../../../../../server/jwt-handler";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB();
        const minimumObjectId = new mongoose.Types.ObjectId(`${req.query.id}`);
        let user;

        try {
            user = await verify(req.headers.authorization?.split(" ")[1])
        } catch (e) {}
        let channel = getInternalChannelName(`${req.query.channel}`, user?._id);
        if (channel.includes("private-") &&!user) {
            return res.status(500).json({message: "Attempting to get private messages whilst not logged in"})
        }
        const messages = await Message.find({
            _id: {$gt:`${minimumObjectId}`},
            channel
        }, null, {limit:100, sort: {createdAt:-1}}).exec();
        res.status(200).json(pagedResponse(messages))
    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }

}
