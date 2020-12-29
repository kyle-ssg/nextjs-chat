import getFromTo from "./getFromTo";

export default function getInternalChannelName(channel,userId) {
    if (channel.includes("private-")) {
        const [from,to]= getFromTo(userId, channel.split("private-")[1])
        return `private-${from}-${to}`
    }
    return channel
}
