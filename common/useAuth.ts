import {useState} from "react";

import _data from "./_data";
import Project from "./project";
import {IUser} from "models";
import {useGlobalState} from "./state";
import AsyncStorage from "@callstack/async-storage";
import sendHeartbeat from "./sendHeartbeat";
import {getUsers} from "./useUserList";
const useAuth = ()=>{
    const state = useGlobalState()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const uploadImage = (data:string)=> {
        if(!isLoading){
            setIsLoading(true)
            return _data.post(`${Project.api}upload/image`,  {data})
                .then((res)=>{
                    _data.setToken(res.token);
                    state.set((state)=>{
                        state.user = res
                        AsyncStorage.setItem("user", JSON.stringify(res))
                        return state;
                    });
                    getUsers()
                    setIsLoading(false);
                })
                .catch((e)=>{
                    setError(e?.message || e || "Could not upload image");
                })
        }
    }
    const register = (username:string,password:string)=> {
        if (isLoading) {
            return
        }
        if (!username || !password) {
            setError("Please enter a username and password");
            return Promise.reject(error)
        } else {
            setIsLoading(true)
            return _data.post(`${Project.api}auth/register/email`,{username,password})
                .then((res:IUser)=>{
                    _data.setToken(res.token);
                    AsyncStorage.setItem("user",JSON.stringify(res));
                    state.set((state)=>{
                        state.user = res
                        return state;
                    });
                    setIsLoading(false);
                }).catch((e)=>{
                    setIsLoading(false)
                    setError(e?.message|| e || "There was an error processing your request");
                    return Promise.reject(e)
                })
        }
    }
    const logout = async ()=> {
        _data.setToken("");
        state.set((state)=>{
            state.user = null
            return state;
        });
        await AsyncStorage.removeItem("user")
    }
    const login = (username:string,password:string)=> {
        if (isLoading) {
            return
        }
        if (!username || !password) {
            setError("Please enter a username and password");
            return Promise.reject(error)
        } else {
            setIsLoading(true)
            return _data.post(`${Project.api}auth/login/email`,{username,password})
                .then((res:IUser)=>{
                    AsyncStorage.setItem("user",JSON.stringify(res));
                    _data.setToken(res.token);
                    state.set((state)=>{
                        state.user = res
                        return state;
                    });
                    setIsLoading(false);
                }).catch((e)=>{
                    setIsLoading(false)
                    setError(e?.message|| e || "There was an error processing your request");
                    return Promise.reject(e)
                })
        }
    }

    return {login,register,error,isLoading, logout, uploadImage, user: state.get().user}
}


export default useAuth;
