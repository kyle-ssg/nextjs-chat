import React, {FunctionComponent, useState} from 'react';
import {useGlobalState} from "../common/state";
import useAuth from "../common/useAuth";
import LoginModal from "./LoginModal";
import Avatar from "./Avatar";
import {DEFAULT_AVATAR} from "../common/constants"; // we need this to make JSX compile

type ComponentType = {}

const RightSidebarContainer: FunctionComponent<ComponentType> = ({}) => {
    const {user,logout, uploadImage, isLoading} = useAuth();
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const submit = ()=> {

    }

    return (
        <>

            <div className="panel">
                {user? (
                    <div className="text-center mb-2">
                        <Avatar isLoading={isLoading} onChange={uploadImage} src={user.avatar||DEFAULT_AVATAR}/>
                        <button onClick={logout} className="btn btn-primary">
                            Logout
                        </button>
                    </div>
                ): (
                    <div className="text-center mb-2">
                        <div>
                            You are not logged in
                        </div>
                        <button onClick={()=>setShowLogin(true)} className="btn btn-primary">
                            Login / Register
                        </button>
                    </div>
                )}
                    <LoginModal visible={showLogin} setVisible={setShowLogin} onComplete={submit}/>
            </div>

        </>
    )
}

export default RightSidebarContainer
