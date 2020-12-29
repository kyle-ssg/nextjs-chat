import type { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"

import {getDB} from "server/connect"
import {Message} from "server/schemas";
import {pagedResponse} from "server/paged-response";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";
import getFromTo from "server/getFromTo";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB();
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
        const [from,to] = getFromTo(user._id, `${req.query.to}`);

        const minimumObjectId = new mongoose.Types.ObjectId(`${req.query.id}`);
        const messages = await Message.find({
            _id: {$gt:`${minimumObjectId}`},
            from,
            to
        }, null, {limit:100, sort: {createdAt:-1}}).exec();
        res.status(200).json(pagedResponse(messages))
    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }

}
