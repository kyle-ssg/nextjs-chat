import { createState, useState } from '@hookstate/core';
import {IMessage, IUserBase} from "models";
export type StateType = {
    user?: IUserBase,
    messages: Record<string, IMessage[]>
}
const state:StateType = {
    messages:{}
}
export const globalState = createState(state);
export const useGlobalState = ()=> useState(globalState)
