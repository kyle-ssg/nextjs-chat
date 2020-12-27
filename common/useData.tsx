import {useEffect, useRef, useState} from "react";
import {IMessage, PagedResponse} from "../models";
import _data from "./_data";

const TIMER = 5000;
let chatCache = {}

type IChat = {
    chat: Record<string, IMessage[]>,
    setRoom: (name: string) => void,
    sendMessage: (message: string) => void,
    room: string
}
export default function useData(): IChat {
    const [lastUpdated, setLastUpdated] = useState<number>(Date.now().valueOf());
    const channel = useRef("general")
    const setRoom = (name: string) => {
        if (channel.current !== name) {
            channel.current = name;
            setLastUpdated(Date.now().valueOf())
            getMessages()
        }
    }
    const sendMessage = async (message: string) => {
        const text = message?.trim();
        if (text) {
            const currentChannel = `${channel.current}`
            const data: Partial<IMessage> = {
                name: "Kyle",
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                text: message
            }
            await _data.post(`/api/messages/${currentChannel}/send`, data);
            setLastUpdated(Date.now().valueOf())
        }

    }
    const getMessages = () => {
        const currentChannel = `${channel.current}`
        const currentMessages = chatCache[currentChannel];
        const lastMessage: IMessage|null = currentMessages?.length ? currentMessages[currentMessages.length-1] : null
        _data.get(lastMessage ? `/api/messages/${currentChannel}/after/${lastMessage._id}` : `/api/messages/${currentChannel}`)
            .then((messages: PagedResponse<IMessage>) => {
                chatCache[currentChannel] = messages.data.concat(chatCache[currentChannel] || []);
                setLastUpdated(Date.now().valueOf())
            })
    }
    useEffect(() => {
        getMessages()
        setInterval(() => {
            getMessages()
        }, TIMER)
    }, []);


    return {
        chat: chatCache,
        setRoom,
        room: channel.current,
        sendMessage
    }
}
