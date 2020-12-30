import React, {FunctionComponent} from 'react';
import {useGlobalState} from "../common/state"; // we need this to make JSX compile
import Link from "next/link";
import cx from 'classname'
import MessageIcon from "./icons/MessageIcon";
type ComponentType = {}

const Privates: FunctionComponent<ComponentType> = ({}) => {
    const state = useGlobalState();
    const room = state.get().room
    const privates = state.get().privates;
    return privates?(
        <div className="private-list">
            {privates.map((user)=>{
                const link = "private-"+user._id
                return (
                    <Link key={user._id} href={`/?room=${link}`}>
                        <div className={cx("flex-row room-name", {"room-name--active":room === link})}>
                            <span className="icon-container">
                                <MessageIcon/>
                            </span>
                            <span className="username">
                                {user.username}
                            </span>
                        </div>
                    </Link>
                )
            })}
        </div>
    ) : null
}

export default Privates
