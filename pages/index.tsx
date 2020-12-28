import {useEffect, useState} from "react";
import useData from "common/useData";
import Input from "components/Input";
import ChatContainer, {Message} from "components/ChatContainer";
import RightSidebarContainer from "../components/RightSidebarContainer";
import Project from "../common/project";
import {DEFAULT_AVATAR} from "../common/constants";
import useAuth from "../common/useAuth";
import bot from "../common/bot";

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
                        <Message message={bot({text:"You do not have access to this room."})}/>

                        <Message message={bot({text:"Sorry :)."})}/>
                    </div>
                    ): needsVoice? (
                    <div className="messages">
                        <Message message={bot({text:"You need to login to use voice rooms."})}/>
                        <Message message={bot({text:"Click login on the top right of the screen :)."})}/>
                    </div>
                ) : (
                        <>
                            <ChatContainer room={room}/>
                            {user?.role !== "ADMIN" && Project.readOnlyRooms.includes(room) ? null : <Input onSubmit={sendMessage}/> }
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
