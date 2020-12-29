import React, {useEffect, useRef, useState} from "react";
import {IMessage, IUserBase, PagedResponse} from "models";
import _data from "./_data";
import {globalState, StateType, useGlobalState} from "./state";
import Project from "./project";
import uniqBy from 'lodash/uniqBy'
const MAX_MESSAGES = 100;

type IChat = {
    getUsers: () => Promise<void>,
    users: StateType['users'],
    activeUsers: StateType['users'],
    inactiveUsers: StateType['users'],
}

const timestamp = React.createRef()

export const getUsers  = () => {
    const state = globalState;
    return  _data.get(timestamp.current ? `${Project.api}users/after/${timestamp.current}` : `/api/users`)
        .then((users: PagedResponse<IUserBase>) => {
            if (users.data.length) {
                state.set((draft)=>{
                    if (!draft.users) {
                        draft.users = users.data;
                    } else {
                        users.data.map((user)=>{
                            const index = draft.users.findIndex((existingUser)=>{
                                return user._id === existingUser._id;
                            })
                            if (index === -1) {
                                draft.users.push(user);
                            } else {
                                draft.users[index] = user;
                            }
                        })
                    }
                    if(timestamp) {
                        timestamp.current = new Date().setMilliseconds(0).valueOf();
                    }
                    return draft
                })
            }

        })
}
export default function useData(): IChat {
    const state = useGlobalState();
    return {
        users: state.get().users,
        activeUsers: state.get().activeUsers,
        inactiveUsers: state.get().inactiveUsers,
        getUsers: getUsers
    }
}
