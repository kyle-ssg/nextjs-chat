import {NextApiRequest, NextApiResponse} from "next";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";
const RtcTokenBuilder = require('server/agora/RtcTokenBuilder').RtcTokenBuilder;
const RtcRole = require('server/agora/RtcTokenBuilder').Role;

const appCertificate = process.env.AGORA;
const appID = process.env.AGORA_APP;
const role = RtcRole.PUBLISHER;

const expirationTimeInSeconds = 6400
const currentTimestamp = Math.floor(Date.now() / 1000)
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

export default async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);

        const channelName = req.body.room;
        const uid = user.username;
        console.log("Generating token", appID, appCertificate, channelName, uid, role, privilegeExpiredTs)
        const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
        res.status(200).json({token})

    } catch (e) {
        res.status(500).json({message:e?.message||e})
    }
}
