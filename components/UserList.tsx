import React, {FunctionComponent, useEffect, useState} from 'react';
import useUserList from "../common/useUserList";
import {IUserBase} from "../models";
import {DEFAULT_AVATAR} from "../common/constants"; // we need this to make JSX compile
import cx from "classname";
import safeEventParse from "../common/saveEventParse";
import sendHeartbeat from "../common/sendHeartbeat";
type ComponentType = {}

type UserSummaryType = {
    user:IUserBase,
    active?:boolean
}

const UserSummary: FunctionComponent<UserSummaryType> = ({user, active}) => {
    return (
        <div className={cx("flex-row user-summary mb-2",{active,admin:user.role==="ADMIN"})}>
            <img className="avatar" src={user.avatar||DEFAULT_AVATAR}/>
            <div className="username ml-2">
                {user.username}
            </div>
        </div>
    )
}

const UserList: FunctionComponent<ComponentType> = ({}) => {
    const {getUsers, inactiveUsers, activeUsers} = useUserList();
    const [filter, setFilter] = useState<string>("")
    useEffect(()=>{
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

    return (
        <>
            <div className="input-container-default input-container-sm mx-2 mt-2">
                <input onChange={(e)=>setFilter(safeEventParse(e))} placeholder="Search..." type="text"/>
            </div>
            <div className="ml-2 user-list mt-2">
                {
                    filteredActiveUsers?.map((user)=>(
                        <UserSummary active key={user._id} user={user}/>
                    ))
                }
                {
                    filteredInactiveUsers?.map((user)=>(
                        <UserSummary key={user._id} user={user}/>
                    ))
                }
            </div>
        </>
    )
}

export default UserList
