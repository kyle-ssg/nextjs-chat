import {getCollection} from '../../server/connect'

export default async (req, res) => {
    const collection = await getCollection("users")
    const users = await collection.find({}).toArray()
    res.status(200).json({ users })
}
