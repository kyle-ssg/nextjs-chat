import AsyncStorage from '@callstack/async-storage';
import React, {useState} from 'react'
import '../styles/index.scss'
import { useEffect } from "react";
import { useGlobalState } from "../common/state";



export default function MyApp({ Component, pageProps }) {
    const [isActive, setIsActive] = useState(false);
    const [initialUser, setInitialUser] = useState(false);
    const state = useGlobalState();
    useEffect(()=>{
        AsyncStorage.multiGet(["darkmode", "user"]).then(([darkMode,user])=>{
            if(darkMode[1]==="dark") {
                document.body.classList.add("dark");
            }
            if (user[1]) {
                state.set((state)=>state.user = user[1])
            }
            setIsActive(true)
        }).catch((e)=>{
            setIsActive(true)
        })
    },[])
    return isActive? <Component {...pageProps} /> : null
}
