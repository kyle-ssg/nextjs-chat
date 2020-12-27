import {NextApiRequest, NextApiResponse} from "next";
import {visionClient} from "server/gcp";
import {google} from "@google-cloud/vision/build/protos/protos";
import explicitCheck from "server/explicit-check";
import uploadPhoto from "server/upload-photo";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";


export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
        const problem = await explicitCheck(req.body.data);
        if (problem) {
            res.status(400).json({message:`This image has been detected as ${problem}, if you believe this is not correct please contact an administrator.`})
        } else {
            const result = await uploadPhoto(user.username,req.body.data);
            res.status(200).json({result})
        }
    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }
}
