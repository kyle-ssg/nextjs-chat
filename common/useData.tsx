import {useEffect, useRef, useState} from "react";
import {IMessage, IMessageBase, PagedResponse} from "models";
import _data from "./_data";
import {useGlobalState} from "./state";
import Project from "./project";
import {GUID} from "./guid";
import {getPrivateMessages} from "./usePrivateMessages";

const MAX_MESSAGES = 100;

type IChat = {
    setRoom: (name: string) => void,
    sendMessage: (message: string) => void,
    setVoiceRoom: (room: string) => void,
    leaveVoiceRoom: () => void,
    room: string,
    getMessages: ()=> void;
}
const findByLocalId = (messages:IMessageBase[], id:string) =>{
    return messages.findIndex((message)=>{
        return message.localId === id;
    })
}
export default function useData(redirectHome?:()=>void): IChat {
    const state = useGlobalState();
    const setRoom = (name: string) => {
        if (state.get().room !== name) {
            if(name.includes("voice-")) {
                setVoiceRoom(name)
            }
            state.set((newState)=>{
                newState.room = name
                return newState
            });
            getMessages()
        }
    }
    const setVoiceRoom = (name: string) => {
        state.set((draft)=>{
            draft.voiceRoom = name;
            return draft
        })
    }
    const leaveVoiceRoom = () => {
        state.set((draft)=>{
            if (draft.voiceRoom === draft.room) {
                draft.room = "general"
                redirectHome && redirectHome();
            }
            draft.voiceRoom = null;
            return draft
        })
    }
    const sendMessage = async (message: string) => {
        const text = message?.trim();
        const room = state.get().room;
        if (text) {
            const currentChannel = `${room}`
            const data: Partial<IMessage> = {
                text: message,
                messageType: "TEXT",
                localId: GUID(state.get().user._id)
            };
            state.set((draft)=>{
                draft.messages[room] = draft.messages[room] || []
                draft.messages[room].push({
                    avatar:draft.user.avatar,
                    text:message,
                    _id:"",
                    messageType: "TEXT",
                    localId:data.localId,
                    username:draft.user.username
                });
                return draft
            })

            await _data.post(`${Project.api}messages/${currentChannel}/send`, data).then(()=>{
                getMessages()
            })
        }
    }
    const getLastRemoteMessage = (currentMessages: IMessageBase[]|null)=> {
        if (!currentMessages) {
            return null
        }
        let lastMessage, index = currentMessages.length - 1;
        for ( ; index >= 0; index--) {
            if (currentMessages[index]._id) {
                lastMessage = currentMessages[index];
                break;
            }
        }
        return lastMessage;
    }
    const getMessages = () => {
        const room = state.get().room;
        if (!room) {
            return
        }
        const currentChannel = `${room}`
        const currentMessages = state.get().messages[currentChannel];
        const lastMessage: IMessageBase|null = getLastRemoteMessage(currentMessages);
        getPrivateMessages();
        _data.get(lastMessage ? `${Project.api}messages/${currentChannel}/after/${lastMessage._id}` : `/api/messages/${currentChannel}`)
            .then((messages: PagedResponse<IMessage>) => {
                if (messages.data.length) {
                    state.set((draft)=>{
                        if (draft.messages[currentChannel]?.length) {
                            messages.data.map((newMessage)=>{
                                const existingIndex = newMessage.localId ? findByLocalId(draft.messages[currentChannel], newMessage.localId) : -1;
                                if (existingIndex!==-1) {
                                    draft.messages[currentChannel][existingIndex] = newMessage;
                                } else {
                                    draft.messages[currentChannel].push(newMessage)
                                }
                            })
                        } else {
                            draft.messages[currentChannel] = messages.data;
                        }
                        if (draft.messages[currentChannel].length > MAX_MESSAGES) {
                            draft.messages[currentChannel] = draft.messages[currentChannel].slice(Math.max(draft.messages[currentChannel].length - MAX_MESSAGES, 0))
                        }
                        return draft
                    })
                }
            })
    }

    return {
        setRoom,
        room: state.get().room,
        sendMessage,
        setVoiceRoom,
        leaveVoiceRoom,
        getMessages
    }
}
