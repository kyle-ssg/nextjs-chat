export default function (userIdA:string,userIdB:string) {
    if (userIdA>userIdB) {
        return [userIdB,userIdA]
    }
    return [userIdA, userIdB]
}
