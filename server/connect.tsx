import {Mongoose} from "mongoose";
let cachedDb: Mongoose = null
const mongoose = require('mongoose');

async function connect(uri) {
    if (cachedDb) {
        return cachedDb
    }
    cachedDb = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true })
    return cachedDb
}

export async function getDB(): Promise<Mongoose> {
    return await connect(process.env.MONGODB_URI)
}
