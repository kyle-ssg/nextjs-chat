import React, {FunctionComponent} from 'react';
import {useGlobalState} from "common/state";
import {DEFAULT_AVATAR} from "common/constants";
import {IMessage} from "models"; // we need this to make JSX compile
import cx from 'classname'

type ComponentType = {
    room: string
}


type MessageContentType = { message: IMessage,yourName?:string }

export const Message: FunctionComponent<MessageContentType> = ({message,yourName}) => {
    return (
        <div key={message._id} className={cx({you: yourName === message.username}, "flex-row message")}>
            <div className="text-center">
                <img className="message__avatar" src={message.avatar || DEFAULT_AVATAR}/>

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



const ChatContainer: FunctionComponent<ComponentType> = ({room}) => {
    const state = useGlobalState().get();
    const messages = state.messages[room] || []
    const yourName = state.user?.username;
    return (
        <div className="messages">
            {messages.map((message) => (
               <Message key={message._id} yourName={yourName} message={message}/>
            ))}
        </div>
    )
}

export default ChatContainer
