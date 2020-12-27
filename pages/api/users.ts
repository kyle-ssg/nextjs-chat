import mongoose, {Schema, Document} from 'mongoose';
import {NextApiRequest, NextApiResponse} from "next";

import {getDB} from '../../server/connect'
import {User} from "../../server/schemas";
import {pagedResponse} from "../../server/paged-response";


export default async (req:NextApiRequest, res:NextApiResponse) => {
    await getDB()
    const users = await User.find({}).exec();
    res.status(200).json(pagedResponse(users))
}
