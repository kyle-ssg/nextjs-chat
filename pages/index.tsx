import {useEffect, useState} from "react";
import useData from "common/useData";
import Input from "components/Input";
import ChatContainer from "components/ChatContainer";
import RightSidebarContainer from "../components/RightSidebarContainer";

export default function Home() {
  const [isActive, setIsActive] = useState<boolean>(false)
    const {
        room,
        sendMessage,
    } = useData();
  return (
    <>
        <div className="page-container__main">
            <ChatContainer room={room}/>
            <Input onSubmit={sendMessage}/>
        </div>
        <div className="page-container__right-menu">
            <RightSidebarContainer/>
        </div>

    </>
  )
}
