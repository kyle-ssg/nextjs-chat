import {useEffect, useRef, useState} from "react";
import {IMessage, PagedResponse} from "models";
import _data from "./_data";
import {useGlobalState} from "./state";
import Project from "./project";


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
                text: message
            }
            await _data.post(`${Project.api}messages/${currentChannel}/send`, data).then(()=>{
                getMessages()
            })
        }

    }
    const getMessages = () => {
        const currentChannel = `${channel.current}`
        const currentMessages = state.get().messages[currentChannel];
        const lastMessage: IMessage|null = currentMessages?.length ? currentMessages[currentMessages.length-1] : null
        _data.get(lastMessage ? `${Project.api}messages/${currentChannel}/after/${lastMessage._id}` : `/api/messages/${currentChannel}`)
            .then((messages: PagedResponse<IMessage>) => {
                state.set((draft)=>{
                    draft.messages[currentChannel] = (draft.messages[currentChannel] || []).concat(messages.data||[])
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
