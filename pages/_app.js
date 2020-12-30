import AsyncStorage from "@callstack/async-storage";
import React, {useState, useEffect} from "react"
import { useRouter } from 'next/router'

import '../styles/index.scss'
import 'react-image-crop/lib/ReactCrop.scss';

import { useGlobalState } from "common/state";
import _data from "common/_data";
import RoomList from "components/RoomList";
import useData from "common/useData";
import Project from "common/project";
import Heartbeat from "../components/Hearbeat";
import sendHeartbeat from "../common/sendHeartbeat";
import Voice from "../components/Voice";


export default function MyApp({ Component, pageProps }) {
    const [isActive, setIsActive] = useState(false);
    const state = useGlobalState();

    const router = useRouter()
    const {
        setRoom,
        getMessages,
        leaveVoiceRoom
    } = useData(()=>{
        router.replace("/")
    });


    useEffect(()=>{
        setRoom(router.query.room||"general")
        sendHeartbeat();
    }, [router.query.room])

    useEffect(() => {
        setInterval(() => {
            getMessages()
        }, Project.MESSAGE_TIMER)
    }, []);

    useEffect(()=>{
        AsyncStorage.multiGet(["darkmode", "user"]).then(([darkMode,user])=>{
            if(darkMode[1]==="dark") {
                document.body.classList.add("dark");
            }
            if (user[1]) {
                try {
                    const userData = JSON.parse(user[1]);
                    state.set((state)=>{
                        _data.setToken(userData.token);
                        state.user = userData
                        return state
                    });
                } catch (e){}
            }
            setIsActive(true)
        }).catch((e)=>{
            setIsActive(true)
        })
    },[])
    const voiceRoom = state.get().voiceRoom;

    return (
        <div className="page-container">
            <div className="page-container__sidebar"/>
            <div className="page-container__side-menu">
                <RoomList leaveVoiceRoom={leaveVoiceRoom}/>
            </div>
            {isActive? <Component {...pageProps} /> : null}
            {voiceRoom && (
                <Voice key={voiceRoom} room={voiceRoom}/>
            )}
            <Heartbeat/>
        </div>
    )
}
