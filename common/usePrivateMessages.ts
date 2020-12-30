import {useState} from "react";

import _data from "./_data";
import Project from "./project";
import {IPrivate, IUser, PagedResponse} from "models";
import {globalState, useGlobalState} from "./state";
import AsyncStorage from "@callstack/async-storage";
import sendHeartbeat from "./sendHeartbeat";
import {getUsers} from "./useUserList";

export const getPrivateMessages = ()=>{
    const state = globalState;
    if (state.get().users) {
        return _data.get(`${Project.api}private/me`)
            .then((res:PagedResponse<string>)=>{
                const users = state.get().users;
                state.set((draft)=>{
                    draft.privates = res.data.map((thread)=>{
                        const existingUser = users.find((u)=>u._id===thread)
                        return existingUser;
                    });
                    return draft
                })
            })
    }
}
const useAuth = ()=>{
    const state = useGlobalState()

}


export default useAuth;
