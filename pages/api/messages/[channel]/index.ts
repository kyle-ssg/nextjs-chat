import {NextApiRequest, NextApiResponse} from "next";

import {getDB} from "server/connect'
import {Message} from "server/schemas";
import {pagedResponse} from "server/paged-response";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    await getDB()
    const messages = await Message.find({channel: req.query.channel}, null, {limit:100, sort: {createdAt:1}}).exec();
    res.status(200).json(pagedResponse(messages))
}
