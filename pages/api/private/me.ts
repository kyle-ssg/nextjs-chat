import {NextApiRequest, NextApiResponse} from "next";

import {getDB} from "server/connect"
import {Message, Private} from "server/schemas";
import {pagedResponse} from "server/paged-response";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";
import Project from "common/project";
import getFromTo from "server/getFromTo";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
        const [from,to] = getFromTo(user._id, `${req.query.to}`);
        const messages = await Private.find({
            $or: [{ from: user._id }, { to: user._id }]
        }, null, {sort: {createdAt:1}}).exec();
        res.status(200).json(pagedResponse(messages.map((p)=>{
            if(p.from === user._id) {
                return p.to;
            }
            return p.from;
        })))
    } catch (e) {
        res.status(500).json(e?.message ? {message:e.message} : e)
    }
}
