import AsyncStorage from "@callstack/async-storage";
import React, {FunctionComponent, useEffect, useState} from "react";
import HashtagIcon from "./icons/HashtagIcon";
import MicIcon from "./icons/MicIcon"; // we need this to make JSX compile
import cx from "classname";
import Project from "../common/project";
import Link from "next/link"
import Switch from "rc-switch";
import useAuth from "../common/useAuth";
type ComponentType = {
    setRoom:(name:string)=>void
    room: string
}


type RoomItemType = {
    name:string,
    currentRoom:string,
    onChange: (name:string)=>void
    icon: React.ReactNode
    voice?: boolean
}

const RoomName: FunctionComponent<RoomItemType> = ({name,currentRoom,voice, icon, onChange}) => {
    const id = voice?`voice-${name}`:name;
    return (
        <Link
            href={"/?room="+id}>
            <div
                className={cx({"room-name--active":id===currentRoom},"flex-row room-name")}>
            <div className="icon-container">
                {icon}
            </div>
                <span>
                    {name}
                </span>
            </div>
        </Link>
    )
}


const RoomList: FunctionComponent<ComponentType> = ({setRoom,room}) => {
    const [isDark, setIsDark] = useState<boolean>(false)
    useEffect(()=>{
      AsyncStorage.getItem("darkmode",(err,res)=>{
          if (res === 'dark') {
              setIsDark(true)
          }
      })
    }, [])
    const toggleDarkMode = ()=> {
        document.body.classList.toggle("dark")
        AsyncStorage.setItem("darkmode",document.body.classList.contains("dark")?"dark":"");
        setIsDark(document.body.classList.contains("dark"))
    }
    const {user} = useAuth()

    return (
        <div>
            <div className="mb-2">
                <label>
                    Chat
                </label>
                {Project.chatRooms.map((name)=>(<RoomName currentRoom={room} key={name} name={name} icon={<HashtagIcon/>} onChange={setRoom}/>))}
                {user?.role === "ADMIN" && Project.adminOnlyRooms.map((name)=>(<RoomName currentRoom={room} key={name} name={name} icon={<HashtagIcon/>} onChange={setRoom}/>))}
            </div>
            <div className="mb-2">
                <label>
                    Voice
                </label>
                {Project.voiceRooms.map((name)=>(<RoomName voice currentRoom={room} key={name} name={name} icon={<MicIcon/>} onChange={setRoom}/>))}
                {user?.role === "ADMIN" && Project.adminVoiceOnlyRooms.map((name)=>(<RoomName voice currentRoom={room} key={name} name={name} icon={<MicIcon/>} onChange={setRoom}/>))}
            </div>
            <div className="mb-2">
            <label>
                Personal
            </label>
                <div className="mt-2">
                    Soon
                </div>
                <div className="darkmode">
                    <Switch
                        checkedChildren="DARK"
                        unCheckedChildren="LIGHT"
                        onChange={toggleDarkMode} checked={isDark}/>
                </div>

            </div>
        </div>
    )
}

export default RoomList
