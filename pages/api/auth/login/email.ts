import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../../server/schemas";
import '../../../../server/auth';
import {getDB} from "../../../../server/connect";


export default async (req:NextApiRequest, res:NextApiResponse) => {
    await getDB()
    const {body:{username,password}} = req
    if(!username){
        res.status(400).json({message:"Please enter a username"})
    }
    if(!password){
        res.status(400).json({message:"Please enter a password"})
    }
    try {
        const { user } = await User.authenticate()(username, password);
        res.status(200).json(user)
    } catch (e) {
        res.status(403).json({message:"Please check your username and password"})
    }

}
