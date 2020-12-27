import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

export function signToken(data) {
    return jwt.sign(data, secret);
}

export async function verify(token) {
    return jwt.verify(token, secret);
}
