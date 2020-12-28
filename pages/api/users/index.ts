import {NextApiRequest, NextApiResponse} from "next";

import {getDB} from "server/connect"
import {Message, parseUser, User} from "server/schemas";
import {pagedResponse} from "server/paged-response";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB()
        const users = await User.find({}, null, { sort: {username:1} }).exec();
        res.status(200).json(pagedResponse(users.map((user)=>parseUser(user))))
    } catch (e) {
        res.status(500).json(e?.message ? {message:e.message} : e)
    }
}
