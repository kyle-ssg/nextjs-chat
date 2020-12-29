import React, {FunctionComponent, useState} from 'react';
import {useGlobalState} from "../common/state";
import useAuth from "../common/useAuth";
import LoginModal from "./LoginModal";
import Avatar from "./Avatar";
import {DEFAULT_AVATAR} from "../common/constants";
import UserIcon from "./icons/UserIcon";
import UserList from "./UserList";
import {useRouter} from "next/router"; // we need this to make JSX compile

type ComponentType = {}

const RightSidebarContainer: FunctionComponent<ComponentType> = ({}) => {
    const {user,logout, uploadImage, isLoading} = useAuth();
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const router = useRouter()
    const submitLogout = ()=> {
        logout();
        router.replace("/")
    }

    return (
        <>
            <div className="panel">
                {user? (
                    <div>
                        <div className="text-center">
                            <Avatar isLoading={isLoading} onChange={uploadImage} src={user.avatar||DEFAULT_AVATAR}/>
                        </div>
                        <div className="mt-2">
                            <span className="flex-row row-center username">
                               <UserIcon/>
                               <div className="ml-2">
                                   {user.username}
                               </div>
                            </span>
                        </div>
                        <div className="mt-2 text-center">
                            <button className="btn btn-sm btn-outline-primary" onClick={submitLogout}>
                                Logout
                            </button>
                        </div>

                    </div>
                ): (
                    <div className="text-center mb-2 mt-2">
                        <button onClick={()=>setShowLogin(true)} className="btn btn-sm btn-outline-primary">
                            Login / Register
                        </button>
                    </div>
                )}
            </div>
            <div className="panel user-list-panel mt-4">
                <UserList/>
            </div>
            <LoginModal visible={showLogin} setVisible={setShowLogin} onComplete={()=>{}}/>

        </>
    )
}

export default RightSidebarContainer
