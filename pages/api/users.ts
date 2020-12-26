// Import Dependencies
import url from 'url'
import {connect, getCollection} from '../../server/connect'
// Create cached connection variable


// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
export default async (req, res) => {

    const collection = await getCollection("users")
    // Select the users collection from the database
    const users = await collection.find({}).toArray()

    // Respond with a JSON string of all users in the collection
    res.status(200).json({ users })
}
