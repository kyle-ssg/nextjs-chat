import {useEffect, useRef, useState} from "react";
import {IMessage, PagedResponse} from "../models";
import _data from "./_data";
import {useGlobalState} from "./state";


type IChat = {
    setRoom: (name: string) => void,
    sendMessage: (message: string) => void,
    room: string,
    getMessages: ()=> void;
}
export default function useData(): IChat {
    const state = useGlobalState();
    const channel = useRef("general")
    const setRoom = (name: string) => {
        if (channel.current !== name) {
            channel.current = name;
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
        }

    }
    const getMessages = () => {
        const currentChannel = `${channel.current}`
        const currentMessages = state.get().messages[currentChannel];
        const lastMessage: IMessage|null = currentMessages?.length ? currentMessages[currentMessages.length-1] : null
        _data.get(lastMessage ? `/api/messages/${currentChannel}/after/${lastMessage._id}` : `/api/messages/${currentChannel}`)
            .then((messages: PagedResponse<IMessage>) => {
                state.set((draft)=>{
                    draft.messages[currentChannel] = messages.data.concat(draft.messages[currentChannel] || [])
                    return draft
                })
            })
    }

    return {
        setRoom,
        room: channel.current,
        sendMessage,
        getMessages
    }
}
