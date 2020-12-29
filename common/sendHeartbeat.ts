import _data from "./_data";
import Project from "./project";
import {HeartBeatType, globalState as state} from "./state";
import {IUserBase} from "../models";


function findById (user:IUserBase, v:HeartBeatType[]): HeartBeatType {
    return v.find((h)=>h._id === user?._id)
}
function activeUsers(users:IUserBase[]):IUserBase[] {
    return users.filter((user)=>!!user.online)
}
function inactiveUsers(users:IUserBase[]):IUserBase[] {
    return users.filter((user)=>!user.online)
}

export default function sendHeartbeat() {
    if(!state.get().users){
        return
    }
    _data.get(`${Project.api}heartbeat/${state.get().room || "general"}`)
        .then((res:HeartBeatType[])=>{
            state.set((draft)=>{
                draft.users = state.get().users.map((user)=>{
                    const matchingResult = findById(user,res);
                    return {
                        ...user,
                        online:!!matchingResult,
                        activeRoom: matchingResult?.activeRoom
                    }
                });
                const activeUsers = [];
                const inactiveUsers = [];
                const usersPerRoom = {};
                draft.users = draft.users.map((user)=>{
                    const result = res.find((item)=>{
                        return item._id===user?._id
                    });
                    if (result) {
                        user.online = true
                        usersPerRoom[result.activeRoom] = usersPerRoom[result.activeRoom] || []
                        usersPerRoom[result.activeRoom].push(user);
                        activeUsers.push(user);
                    } else {
                        inactiveUsers.push(user);
                    }
                    return user
                })
                draft.inactiveUsers = inactiveUsers;
                draft.activeUsers = activeUsers;
                draft.usersPerRoom = usersPerRoom;
                return draft
            })
        })
}
