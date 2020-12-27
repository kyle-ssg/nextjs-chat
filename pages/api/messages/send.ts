import {NextApiRequest, NextApiResponse} from "next";
import {getDB} from "../../../server/connect";
import {Message} from "../../../server/schemas";
import {pagedResponse} from "../../../server/paged-response";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    await getDB()
    res.status(200).json(req.body)
}
