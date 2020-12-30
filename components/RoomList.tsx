import AsyncStorage from "@callstack/async-storage";
import React, {FunctionComponent, useEffect, useState} from "react";
import HashtagIcon from "./icons/HashtagIcon";
import MicIcon from "./icons/MicIcon"; // we need this to make JSX compile
import cx from "classname";
import Project from "../common/project";
import Link from "next/link"
import Switch from "rc-switch";
import useAuth from "../common/useAuth";
import {StateType, useGlobalState} from "../common/state";
type ComponentType = {
    leaveVoiceRoom: ()=>void
}


type RoomItemType = {
    name:string,
    currentRoom:string,
    leaveVoiceRoom:()=>void,
    icon: React.ReactNode
    voice?: boolean,
    usersPerRoom: StateType['usersPerRoom']
}

const RoomName: FunctionComponent<RoomItemType> = ({
                                                       name,
                                                       usersPerRoom,
                                                       currentRoom,
                                                       leaveVoiceRoom,
                                                       voice,
                                                       icon,
}) => {
    const id = voice?`voice-${name}`:name;
    const activeUsers = usersPerRoom?.[id] || null;
    return (
        <>
        <Link
            href={"/?room="+id}>
            <div
                className={cx({"room-name--active":id===currentRoom, "room-name-voice--active": id===currentRoom && voice},"flex-row space room-name")}>
                <div className="flex-row no-wrap">
                    <div className="icon-container">
                        {icon}
                    </div>
                    <span className="room-name-text">
                        {name}
                    </span>
                </div>

                <span className={cx("ml-1 badge", {"badge-active": id===currentRoom})}>
                    {` (${activeUsers?.length || 0})`}
                </span>
            </div>
        </Link>
            {id===currentRoom && voice &&(
                <div className="text-center">
                    <button onClick={leaveVoiceRoom} className="btn btn-outline-primary btn-sm mb-2 mt-2">
                        Leave Call
                    </button>
                </div>

            )}
            </>
    )
}

const RoomList: FunctionComponent<ComponentType> = ({leaveVoiceRoom}) => {
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
    const state = useGlobalState();
    const usersPerRoom = state.get().usersPerRoom;
    const room = state.get().room;
    const voiceRoom = state.get().voiceRoom;

    return (
        <div>
            <div className="mb-2">
                <label className="sidebar-label">
                    Chat
                </label>
                {Project.chatRooms.map((name)=>(<RoomName leaveVoiceRoom={leaveVoiceRoom} usersPerRoom={usersPerRoom} currentRoom={room} key={name} name={name} icon={<HashtagIcon/>}/>))}
                {user?.role?.includes("ADMIN") && Project.adminOnlyRooms.map((name)=>(<RoomName leaveVoiceRoom={leaveVoiceRoom} usersPerRoom={usersPerRoom} currentRoom={room} key={name} name={name} icon={<HashtagIcon/>}/>))}
            </div>
            <div className="mb-2">
                <label className="sidebar-label">
                    Voice
                </label>
                {Project.voiceRooms.map((name)=>(<RoomName leaveVoiceRoom={leaveVoiceRoom} usersPerRoom={usersPerRoom} voice currentRoom={voiceRoom} key={name} name={name} icon={<MicIcon/>}/>))}
                {user?.role?.includes("ADMIN") && Project.adminVoiceOnlyRooms.map((name)=>(<RoomName leaveVoiceRoom={leaveVoiceRoom} usersPerRoom={usersPerRoom} voice currentRoom={voiceRoom} key={name} name={name} icon={<MicIcon/>}/>))}
            </div>
            <div className="mb-2">
            <label className="sidebar-label">
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
