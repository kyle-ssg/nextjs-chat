import {NextApiRequest, NextApiResponse} from "next";
import {parseUser, User} from "server/schemas";
import 'server/auth';
import {getDB} from "server/connect";


export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const {body:{username,password}} = req
        await getDB()
        if(!username){
            res.status(400).json({message:"Please enter a username"})
        }
        if(!password){
            res.status(400).json({message:"Please enter a password"})
        }
        const { user } = await User.authenticate()(username, password);
        res.status(200).json(parseUser(user, true))
    } catch (e) {
        res.status(403).json({message:e?.message || e})
    }
}
