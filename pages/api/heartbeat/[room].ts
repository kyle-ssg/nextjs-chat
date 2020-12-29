import {NextApiRequest, NextApiResponse} from "next";
import {visionClient} from "server/gcp";
import {google} from "@google-cloud/vision/build/protos/protos";
import explicitCheck from "server/explicit-check";
import uploadPhoto from "server/upload-photo";
import {IUserBase} from "models";
import {verify} from "server/jwt-handler";
import {getDB} from "../../../server/connect";
import {parseUser, User} from "../../../server/schemas";
import {pagedResponse} from "../../../server/paged-response";
import Project from "../../../common/project";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await getDB()
        try {
            const user: IUserBase = await verify(req.headers.authorization?.split(" ")[1]);
            const newData:Partial<IUserBase> = {lastActive: new Date().toISOString(), activeRoom:`${req.query.room}`};
            await User.updateOne({_id: user._id}, {$set: newData})
        } catch (e){}
        const query = Date.now().valueOf() - Project.HEARTBEAT_TIMER
        const users = await User
            .find({
                lastActive: {$gt:`${query}`},
            }, null, { })
            .select("_id activeRoom")
            .exec();
        // @ts-ignore
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({message: e?.message || e})
    }
}
