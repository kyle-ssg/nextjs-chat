import {useEffect, useRef, useState} from "react";
import {IMessage, PagedResponse} from "../models";
import _data from "./_data";
const TIMER = 30000;
let chatCache = {

}

type IChat = {
    chat: Record<string, IMessage[]>,
    setRoom: (name:string)=>void,
    room:string
}
export default function useData():IChat  {
    const [lastUpdated, setLastUpdated] = useState<number>(Date.now().valueOf())
    const channel = useRef("general")
    const setRoom = (name:string)=>{
        channel.current = name;
        setLastUpdated(Date.now().valueOf())
    }
    useEffect(()=>{
       setInterval(()=>{
           const currentChannel =`${channel.current}`
           const lastMessage:IMessage = chatCache[currentChannel]? chatCache[currentChannel][chatCache[currentChannel.length-1]] : null
           _data.get(lastMessage? `/api/messages/${currentChannel}/${lastMessage._id}` : `/api/messages/${currentChannel}` )
               .then((messages:PagedResponse<IMessage>)=>{
                   chatCache[currentChannel] = messages.data.concat(chatCache[currentChannel] || []);
                   setLastUpdated(Date.now().valueOf())
               })
       },TIMER)
    },[]);

    const sendMessage = ()=> {
        _data.post(`/api/messages/send`, {test:1});
    }

    return{
        chat: chatCache,
        setRoom,
        room:channel.current
    }
}
