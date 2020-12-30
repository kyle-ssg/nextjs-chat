import React, {FunctionComponent, useState} from 'react';
import {useGlobalState} from "../common/state";
import useAuth from "../common/useAuth";
import LoginModal from "./LoginModal";
import Avatar from "./Avatar";
import {DEFAULT_AVATAR} from "../common/constants";
import UserIcon from "./icons/UserIcon";
import UserList from "./UserList";
import {useRouter} from "next/router";
import MenuIcon from "./icons/MenuIcon"; // we need this to make JSX compile
import cx from "classname";
import CloseIcon from "./icons/CloseIcon";
type ComponentType = {}

const RightSidebarContainer: FunctionComponent<ComponentType> = ({}) => {
    const {user, logout, uploadImage, isLoading} = useAuth();
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [isActive, setIsActive] = useState<boolean>(false)
    const router = useRouter()
    const submitLogout = () => {
        logout();
        router.replace("/")
    }

    return (
        <>
            <div onClick={() => {
                setIsActive(!isActive)
                document.body.classList.toggle("menu-active")
                document.body.classList.toggle("right-menu-active")
            }} className="menu-right hidden-desktop">
                {isActive ? (
                    <CloseIcon/>
                ): (
                    <MenuIcon/>
                )}
            </div>
            <div className={cx({active:isActive},"page-container__right-menu")}>
                <div className="panel">
                    {user ? (
                        <div>
                            <div className="text-center">
                                <Avatar isLoading={isLoading} onChange={uploadImage}
                                        src={user.avatar || DEFAULT_AVATAR}
                                />
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
                    ) : (
                        <div className="text-center mb-2 mt-2">
                            <button onClick={() => setShowLogin(true)} className="btn btn-sm btn-outline-primary">
                                Login / Register
                            </button>
                        </div>
                    )}
                </div>
                <div className="panel user-list-panel mt-4">
                    <UserList/>
                </div>
                <LoginModal visible={showLogin} setVisible={setShowLogin} onComplete={() => {
                }}
                />
            </div>
        </>
    )
}

export default RightSidebarContainer
