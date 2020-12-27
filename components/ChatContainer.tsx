import React, {FunctionComponent} from 'react';
import {useGlobalState} from "../common/state";
import {DEFAULT_AVATAR} from "../common/constants";
import {IMessage} from "../models"; // we need this to make JSX compile
import cx from 'classname'
type ComponentType = {
    room:string
}


type MessageContentType = {message:IMessage}

const MessageContent: FunctionComponent<MessageContentType> = ({message}) => {
    switch (message.messageType) {
        default: return (
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
        <>te
            {messages.map((message)=>(
                <div key={message._id} className={cx({you:yourName===message.name},"flex-row message")}>
                    <div className="text-center">
                        <img className="message__avatar" src={message.avatar||DEFAULT_AVATAR}/>

                    </div>
                    <div className="ml-2">
                        <div className="message__content">
                            {message.name !== yourName &&(
                                <div className="message__author">
                                    {message.name}
                                </div>
                            )}
                            <MessageContent message={message}/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ChatContainer
