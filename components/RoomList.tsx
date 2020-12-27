import AsyncStorage from "@callstack/async-storage";
import React, {FunctionComponent, useEffect} from "react";
import HashtagIcon from "./icons/HashtagIcon";
import MicIcon from "./icons/MicIcon"; // we need this to make JSX compile
import cx from "classname";
import Project from "../common/project";
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
        <div onClick={()=>onChange(id)} className={cx({"room-name--active":id===currentRoom},"flex-row room-name")}>
            <div className="icon-container">
                {icon}
            </div>
            {name}
        </div>
    )
}


const RoomList: FunctionComponent<ComponentType> = ({setRoom,room}) => {
    const toggleDarkMode = ()=> {
        document.body.classList.toggle("dark")
        AsyncStorage.setItem("darkmode",document.body.classList.contains("dark")?"dark":"");
    }
    return (
        <div>
            <div className="mb-2">
                <label>
                    Chat
                </label>
                {Project.chatRooms.map((name)=>(<RoomName currentRoom={room} key={name} name={name} icon={<HashtagIcon/>} onChange={setRoom}/>))}
            </div>
            <div className="mb-2">
                <label>
                    Voice
                </label>
                {Project.voiceRooms.map((name)=>(<RoomName voice currentRoom={room} key={name} name={name} icon={<MicIcon/>} onChange={setRoom}/>))}
            </div>
            <div className="mb-2">
            <label>
                Personal
            </label>
                <button onClick={toggleDarkMode}>
                    dark
                </button>
            </div>
        </div>
    )
}

export default RoomList
