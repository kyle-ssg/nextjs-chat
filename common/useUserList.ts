import {useEffect, useRef, useState} from "react";
import {IMessage, IUserBase, PagedResponse} from "models";
import _data from "./_data";
import {StateType, useGlobalState} from "./state";
import Project from "./project";
import uniqBy from 'lodash/uniqBy'
const MAX_MESSAGES = 100;

type IChat = {
    getUsers: () => void,
    users: StateType['users'],
}
export default function useData(): IChat {
    const state = useGlobalState();
    const timestamp = useRef(null)

    const getUsers = () => {
        _data.get(timestamp.current ? `${Project.api}users/after/${timestamp.current}` : `/api/users`)
            .then((users: PagedResponse<IUserBase>) => {
                state.set((draft)=>{
                    draft.users = uniqBy((draft.users||[]).concat(users.data),"_id");
                    timestamp.current = Date.now().valueOf();
                    return draft
                })
            })
    }

    return {
        users: state.get().users,
        getUsers
    }
}
