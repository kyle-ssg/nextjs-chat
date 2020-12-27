import React, {FunctionComponent, useState} from 'react';
import {useGlobalState} from "../common/state";
import useAuth from "../common/useAuth";
import LoginModal from "./LoginModal"; // we need this to make JSX compile

type ComponentType = {}

const SidebarContainer: FunctionComponent<ComponentType> = ({}) => {
    const {user,logout} = useAuth();
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const submit = ()=> {

    }

    return (
        <>

            <div className="panel">
                {user? (
                    <div className="text-center mb-2">
                        <button onClick={logout} className="btn btn-primary">
                            Logout
                        </button>
                    </div>
                ): (
                    <div className="text-center mb-2">
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

export default SidebarContainer
