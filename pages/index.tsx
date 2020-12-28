import {useEffect, useState} from "react";
import useData from "common/useData";
import Input from "components/Input";
import ChatContainer, {Message} from "components/ChatContainer";
import RightSidebarContainer from "../components/RightSidebarContainer";
import Project from "../common/project";
import {DEFAULT_AVATAR} from "../common/constants";
import useAuth from "../common/useAuth";

export default function Home() {
  const [isActive, setIsActive] = useState<boolean>(false)
    const {
        room,
        sendMessage,
    } = useData();
    const {user} = useAuth();
    const invalidRoom = !Project.chatRooms.includes(room) && !Project.voiceRooms.includes(room.replace("voice-",""))
    const needsVoice = room.includes("-") && !user?._id;
    return (
    <>
        <div className="page-container__main">
            <div>
                {invalidRoom ? (
                    <div className="messages">
                        <Message message={{
                            username:"God",
                            avatar:DEFAULT_AVATAR,
                            messageType:"TEXT",
                            text:"You do not have access to this room."
                        }}/>
                        <Message message={{
                            username:"God",
                            avatar:DEFAULT_AVATAR,
                            messageType:"TEXT",
                            text:"Sorry :)."
                        }}/>
                    </div>
                    ): needsVoice? (
                    <div className="messages">
                        <Message message={{
                            username:"God",
                            avatar:DEFAULT_AVATAR,
                            messageType:"TEXT",
                            text:"You need to login to use voice rooms."
                        }}/>
                        <Message message={{
                            username:"God",
                            avatar:DEFAULT_AVATAR,
                            messageType:"TEXT",
                            text:":)."
                        }}/>
                    </div>
                ) : (
                        <>
                            <ChatContainer room={room}/>
                            <Input onSubmit={sendMessage}/>
                        </>
                )}
            </div>

        </div>
        <div className="page-container__right-menu">
            <RightSidebarContainer/>
        </div>

    </>
  )
}
