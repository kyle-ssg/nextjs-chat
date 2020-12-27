import Head from "next/head"
import {useEffect, useState} from "react";
import RoomList from "components/RoomList";
import useData from "common/useData";
import Input from "components/Input";
import ChatContainer from "components/ChatContainer";
import SidebarContainer from "../components/SidebarContainer";
const TIMER = 5000;

export default function Home() {
  const [isActive, setIsActive] = useState<boolean>(false)
    const {
        setRoom,
        room,
        getMessages,
        sendMessage,
    } = useData();
    useEffect(() => {
        getMessages()
        setInterval(() => {
            getMessages()
        }, TIMER)
    }, []);
  return (
    <div className="page-container">
        <div className="page-container__sidebar"/>
        <div className="page-container__side-menu">
            <RoomList room={room} setRoom={setRoom}/>
        </div>
        <div className="page-container__main">
            <ChatContainer room={room}/>
            <Input onSubmit={sendMessage}/>
        </div>
        <div className="page-container__right-menu">
            <SidebarContainer/>
        </div>
    </div>
  )
}
