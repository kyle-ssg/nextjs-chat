import {NextApiRequest, NextApiResponse} from "next";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";
import {getDB} from "server/connect";
import {parseUser, User} from "server/schemas";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        await getDB()
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
        await User.updateOne({ _id: user._id }, { $set:  req.body  })
        res.status(200).json(parseUser({
            ...user,
            ...req.body
        },true))
    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }
}
