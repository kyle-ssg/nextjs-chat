import React, {FunctionComponent, useEffect, useState} from 'react';
import useUserList from "../common/useUserList";
import {IUserBase} from "../models";
import {DEFAULT_AVATAR} from "../common/constants"; // we need this to make JSX compile
import cx from "classname";
import safeEventParse from "../common/saveEventParse";
type ComponentType = {}

type UserSummaryType = {
    user:IUserBase
}

const UserSummary: FunctionComponent<UserSummaryType> = ({user}) => {
    return (
        <div className={cx("flex-row user-summary mb-2",{admin:user.role==="ADMIN"})}>
            <img className="avatar" src={user.avatar||DEFAULT_AVATAR}/>
            <div className="username ml-2">
                {user.username}
            </div>
        </div>
    )
}

const UserList: FunctionComponent<ComponentType> = ({}) => {
    const {getUsers, users} = useUserList();
    const [filter, setFilter] = useState<string>("")
    useEffect(()=>{
        getUsers()
    },[]);
    const search = filter.toLowerCase();
    const filteredUsers = filter? users.filter((user)=>{
       return  user.username.toLowerCase().includes(search)
    }) : users

    return (
        <>
            <div className="input-container-default input-container-sm mb-2">
                <input onChange={(e)=>setFilter(safeEventParse(e))} placeholder="Search..." type="text"/>
            </div>
            <div className="user-list mt-4">
                {
                    filteredUsers?.map((user)=>(
                        <UserSummary key={user._id} user={user}/>
                    ))
                }
            </div>
        </>
    )
}

export default UserList
