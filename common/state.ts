import { createState, useState } from "@hookstate/core";
import {IMessage, IUserBase} from "models";
export type StateType = {
    user?: IUserBase,
    messages: Record<string, IMessage[]>,
    users?: IUserBase[],
    online?:string[],
    room?: string
}
const state:StateType = {
    messages:{},
    room:""
}
export const globalState = createState(state);
export const useGlobalState = ()=> useState(globalState)
