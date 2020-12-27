import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

import {getDB} from '../../../../../server/connect'
import {Message} from "../../../../../server/schemas";
import {pagedResponse} from "../../../../../server/paged-response";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    await getDB();
    const minimumObjectId = new mongoose.Types.ObjectId(`${req.query.id}`);
    const messages = await Message.find({
        _id: {$gt:minimumObjectId},
        channel: req.query.channel
    }, null, {limit:100, sort: {createdAt:-1}}).exec();
    res.status(200).json(pagedResponse(messages) )
}
