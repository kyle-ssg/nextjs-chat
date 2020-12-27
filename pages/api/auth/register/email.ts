import {NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../../server/schemas";
import '../../../../server/auth';


export default async (req:NextApiRequest, res:NextApiResponse) => {
    const {body:{username,password}} = req
    if(!username){
        res.status(400).json({message:"Please enter a username"})
    }
    if(!password){
        res.status(400).json({message:"Please enter a password"})
    }

    // @ts-ignore
    User.register({username, role:"USER", bio:"", avatar:""}, password, function(err, user) {
        console.log("Result", err,user)
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({ok:1})
        }
    })
}
