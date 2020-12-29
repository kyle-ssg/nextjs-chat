import { createState, useState } from "@hookstate/core";
import {IMessage, IMessageBase, IUserBase} from "models";

export type HeartBeatType = {
    _id:string,
    activeRoom:string
};

export type StateType = {
    user?: IUserBase,
    messages: Record<string, IMessageBase[]>,
    privates?: string[],
    users?: IUserBase[],
    activeUsers?: IUserBase[],
    inactiveUsers?: IUserBase[],
    usersPerRoom?: Record<string, IUserBase[]>,
    room?: string
}
const state:StateType = {
    messages:{},
    usersPerRoom:{},
    room:""
}
export const globalState = createState(state);
export const useGlobalState = ()=> useState(globalState)
