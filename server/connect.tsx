// A function for connecting to MongoDB,
// taking a single parameter of the connection string
import url from "url";
let cachedDb = null
import {MongoClient} from 'mongodb';

export async function connect(uri) {
    // If the database connection is cached,
    // use it instead of creating a new connection
    if (cachedDb) {
        return cachedDb
    }

    // If no connection is cached, create a new one
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true })

    // Select the database through the connection,
    // using the database path of the connection string
    const db = await client.db(url.parse(uri).pathname.substr(1))

    // Cache the database connection and return the connection
    cachedDb = db
    return db
}

export async function getCollection(name) {
    // Get a database connection, cached or otherwise,
    // using the connection string environment variable as the argument
    const db = await connect(process.env.MONGODB_URI)

    // Select the collection from the database
    return await db.collection(name)
}
