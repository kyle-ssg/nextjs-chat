import jwt from 'jsonwebtoken';
import {IUserBase} from "../models";
const secret = process.env.JWT_SECRET;

export function signToken(data) {
    return jwt.sign(data, secret);
}

export async function verify(token) {
    // @ts-ignore
    const data:IUserBase = jwt.verify(token, secret);
    return data
}
