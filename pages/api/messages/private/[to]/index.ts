import {NextApiRequest, NextApiResponse} from "next";

import {getDB} from "server/connect"
import {Message} from "server/schemas";
import {pagedResponse} from "server/paged-response";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";
import Project from "common/project";
import getFromTo from "server/getFromTo";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
        const [from,to] = getFromTo(user._id, `${req.query.to}`);
        const messages = await Message.find({from,to}, null, {limit:100, sort: {createdAt:1}}).exec();
        res.status(200).json(pagedResponse(messages))
    } catch (e) {
        res.status(500).json(e?.message ? {message:e.message} : e)
    }
}
