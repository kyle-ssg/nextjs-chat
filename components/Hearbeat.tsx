import React, {FunctionComponent, useEffect} from 'react';
import Project from "../common/project";
import _data from "../common/_data";

import {HeartBeatType, useGlobalState} from "../common/state";
import {IUserBase} from "../models";
import sendHeartbeat from "../common/sendHeartbeat"; // we need this to make JSX compile

type ComponentType = {}

let interval;
const Heartbeat: FunctionComponent<ComponentType> = ({}) => {
    const state = useGlobalState()
    useEffect(()=>{
        if (interval) {
            return
        }
        interval = setInterval(()=>{
            sendHeartbeat();
        }, Project.HEARTBEAT_TIMER);
    },[]);
    return null
}

export default Heartbeat
