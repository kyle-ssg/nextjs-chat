import {useEffect, useRef, useState} from "react";
import {IMessage, PagedResponse} from "models";
import _data from "./_data";
import {useGlobalState} from "./state";
import Project from "./project";

const MAX_MESSAGES = 100;

type IChat = {
    setRoom: (name: string) => void,
    sendMessage: (message: string) => void,
    room: string,
    getMessages: ()=> void;
}
export default function useData(): IChat {
    const state = useGlobalState();
    const setRoom = (name: string) => {
        if (state.get().room !== name) {
            state.set((newState)=>{
                newState.room = name
                return newState
            });
            getMessages()
        }
    }
    const sendMessage = async (message: string) => {
        const text = message?.trim();
        const room = state.get().room;
        if (text) {
            const currentChannel = `${room}`
            const data: Partial<IMessage> = {
                text: message
            }
            await _data.post(`${Project.api}messages/${currentChannel}/send`, data).then(()=>{
                getMessages()
            })
        }
    }
    const getMessages = () => {
        const room = state.get().room;
        if (!room) {
            return
        }
        const currentChannel = `${room}`
        const currentMessages = state.get().messages[currentChannel];
        const lastMessage: IMessage|null = currentMessages?.length ? currentMessages[currentMessages.length-1] : null
        _data.get(lastMessage ? `${Project.api}messages/${currentChannel}/after/${lastMessage._id}` : `/api/messages/${currentChannel}`)
            .then((messages: PagedResponse<IMessage>) => {
                state.set((draft)=>{
                    draft.messages[currentChannel] = (draft.messages[currentChannel] || []).concat(messages.data||[])
                    if (draft.messages[currentChannel].length > MAX_MESSAGES) {
                        draft.messages[currentChannel] = draft.messages[currentChannel].slice(Math.max(draft.messages[currentChannel].length - MAX_MESSAGES, 0))
                    }
                    return draft
                })
            })
    }

    return {
        setRoom,
        room: state.get().room,
        sendMessage,
        getMessages
    }
}
