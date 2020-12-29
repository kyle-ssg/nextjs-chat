import {NextApiRequest, NextApiResponse} from "next";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";
import {getDB} from "server/connect";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB()
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
        if (user.role === 'SUPER_ADMIN') {
            await require('mongoose').connection.dropCollection("messages");
            res.status(200).json({ok:1});
        } else {
            res.status(403).json({message:"Only admins can do this"})
        }

    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }
}
