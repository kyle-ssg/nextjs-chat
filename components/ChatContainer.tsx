import React, {FunctionComponent, useEffect, useRef} from "react";
import {useGlobalState} from "common/state";
import {DEFAULT_AVATAR} from "common/constants";
import {IMessageBase} from "models"; // we need this to make JSX compile
import cx from "classname"
import AdminActions from "./AdminActions";

type ComponentType = {}


type MessageContentType = { message: IMessageBase,yourName?:string }

export const Message: FunctionComponent<MessageContentType> = ({message,yourName}) => {
    return (
        <div key={message._id} className={cx({you: yourName === message.username}, "flex-row message no-wrap")}>
            <div className="text-center">
                <img className="message__avatar" src={message.avatar? message.avatar.replace("storage.cloud.google","storage.googleapis") : DEFAULT_AVATAR}/>
            </div>
            <div className="ml-2">
                <div className="message__content">
                    {message.username !== yourName && (
                        <div className="message__author">
                            {message.username}
                        </div>
                    )}
                    <MessageContent message={message}/>
                </div>
            </div>
        </div>
    )
}

const MessageContent: FunctionComponent<MessageContentType> = ({message}) => {
    switch (message.messageType) {
        default:
            return (
                <span className="message__text">
                    {message.text}
                </span>
            )
    }

}



const ChatContainer: FunctionComponent<ComponentType> = () => {
    const state = useGlobalState().get();
    const room = state.room;
    const messages = state.messages[room] || []
    const yourName = state.user?.username;
    const scrolled = useRef(false);
    const ref = useRef();
    useEffect(()=>{
        if(messages.length) {
            const div = ref.current;
            if (div){
                // @ts-ignore
                const height = div.scrollHeight-div.clientHeight;
                // @ts-ignore
                const top = div.scrollTop;
                if (height-top < 300 || !scrolled.current) {
                    scrolled.current = true;
                    // @ts-ignore
                    div.scrollTop = div.scrollHeight;
                }
            }
        }
    },[messages.length,room])


    return typeof window ==='undefined'? <div className="messages"></div>: (
        <div ref={ref} className="messages">
            {messages.map((message) => (
               <Message key={message._id} yourName={yourName} message={message}/>
            ))}
            {state.user?.role === "SUPER_ADMIN" &&(
               <AdminActions room={room}/>
            )}
        </div>
    )
}


export default ChatContainer
