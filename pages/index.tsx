import Head from 'next/head'
import {useState} from "react";
import RoomList from "../components/RoomList";
import useData from "../common/useData";
import Input from "../components/Input";
export default function Home() {
  const [isActive, setIsActive] = useState<boolean>(false)
    const {
        chat,
        setRoom,
        room,
        sendMessage
    } = useData();
  return (
    <div className="page-container">
        <div className="page-container__sidebar">

        </div>
        <div className="page-container__side-menu">
            <RoomList room={room} setRoom={setRoom}/>
        </div>
        <div className="page-container__main">
            <Input onSubmit={sendMessage}/>
        </div>
    </div>
  )
}
