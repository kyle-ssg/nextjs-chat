import React, {FunctionComponent, useEffect, useState} from 'react';
import useUserList from "../common/useUserList";
import {IUserBase} from "../models";
import {DEFAULT_AVATAR} from "../common/constants"; // we need this to make JSX compile
import cx from "classname";
import safeEventParse from "../common/saveEventParse";
import sendHeartbeat from "../common/sendHeartbeat";
import { ContextMenu, ContextMenuTrigger, MenuItem as ContextMenuItem } from "react-contextmenu";
import Link from 'next/link';
import MessageIcon from "./icons/MessageIcon";
import {useRouter} from "next/router";
import useAuth from "../common/useAuth";

type ComponentType = {}

type UserSummaryType = {
    user:IUserBase,
    onClick:(user:IUserBase)=>void,
    active?:boolean
}

type MenuItemIype = {
    text:string,
    icon:React.ReactNode
}

const MenuItem: FunctionComponent<MenuItemIype> = ({icon,text}) => {
    return (
        <div className="menu-item flex-row">
            {icon}
            {text}
        </div>
    )
}


const UserSummary: FunctionComponent<UserSummaryType> = ({user, onClick, active}) => {
    return (
        <div onClick={()=>onClick(user)} className={cx("flex-row user-summary mb-2",{active,admin:user.role==="ADMIN"})}>
            <img className="avatar" src={user.avatar||DEFAULT_AVATAR}/>
            <div className="username ml-2">
                {user.username}
            </div>

        </div>
    )
}
let interval;
const UserList: FunctionComponent<ComponentType> = ({}) => {
    const {user: currentUser} = useAuth();
    const {getUsers, inactiveUsers, activeUsers} = useUserList();
    const [filter, setFilter] = useState<string>("")
    const [activeUser, setActiveUser] = useState<IUserBase>(null);
    const router = useRouter()
    useEffect(()=>{
        if (!interval) {
            interval = setInterval(()=>{
                getUsers().then(()=>{})
            }, 10000)
        }
        getUsers().then(()=>{
            sendHeartbeat()
        })
    },[]);
    const search = filter.toLowerCase();
    const filteredActiveUsers = filter? activeUsers.filter((user)=>{
       return  user.username.toLowerCase().includes(search)
    }) : activeUsers

    const filteredInactiveUsers = filter? inactiveUsers.filter((user)=>{
       return  user.username.toLowerCase().includes(search)
    }) : inactiveUsers

    function handleClick(e, data) {
        switch (data.type) {
            case "SEND":{
                router.push("/?room=private-"+activeUser._id)
                break;
            }
        }
    }
    return (
        <>
            <div className="input-container-default input-container-sm mx-2 mt-2">
                <input onChange={(e)=>setFilter(safeEventParse(e))} placeholder="Search..." type="text"/>
            </div>

            <ContextMenu style={{width:200, height:100}} id="same_unique_identifier">
                <div>
                    <div className="text-center">
                        <h4>{activeUser?.username}</h4>
                    </div>
                    <ContextMenuItem onClick={handleClick} data={{type:"SEND"}}>
                            <MenuItem icon={<MessageIcon/>} text="Send Message" />
                    </ContextMenuItem>
                </div>
            </ContextMenu>
            <div className="ml-2 user-list mt-2">
                {
                    filteredActiveUsers?.map((user)=> {
                        const summary = <UserSummary onClick={setActiveUser} active key={user._id} user={user}/>;
                        if (!currentUser?._id || (user._id === currentUser?._id)) {
                            return summary
                        }
                        return (
                            <ContextMenuTrigger key={user._id} mouseButton={0} id="same_unique_identifier">
                                {summary}
                            </ContextMenuTrigger>
                        )
                    })
                }
                {
                    filteredInactiveUsers?.map((user)=> {
                        const summary = <UserSummary onClick={setActiveUser} key={user._id} user={user}/>;
                        if (!currentUser?._id || (user._id === currentUser?._id)) {
                            return summary
                        }
                        return (
                            <ContextMenuTrigger key={user._id} mouseButton={0} id="same_unique_identifier">
                                {summary}
                            </ContextMenuTrigger>
                        )
                    })
                }
            </div>
        </>
    )
}

export default UserList
