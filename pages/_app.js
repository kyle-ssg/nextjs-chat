import AsyncStorage from '@callstack/async-storage';
import React, {useState} from 'react'
import '../styles/index.scss'
import { useEffect } from "react";



export default function MyApp({ Component, pageProps }) {
    const [isActive, setIsActive] = useState(false);
    const [initialUser, setInitialUser] = useState(false)
    useEffect(()=>{
        AsyncStorage.multiGet(["darkmode", "user"]).then(([darkMode,user])=>{
            if(darkMode[1]==="dark") {
                document.body.classList.add("dark");
            }
            if (user[1]) {
                setInitialUser(user[1])
            }
            setIsActive(true)
        }).catch((e)=>{
            setIsActive(true)
        })
    },[])
    return isActive? <Component {...pageProps} /> : null
}
