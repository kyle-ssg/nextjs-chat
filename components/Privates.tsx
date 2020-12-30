import React, {FunctionComponent} from 'react';
import {useGlobalState} from "../common/state"; // we need this to make JSX compile
import Link from "next/link";
import MessageIcon from "./icons/MessageIcon";
type ComponentType = {}

const Privates: FunctionComponent<ComponentType> = ({}) => {
    const state = useGlobalState();
    const privates = state.get().privates;
    return privates?(
        <div className="private-list">
            {privates.map((user)=>(
                    <Link href={"/?room=private-"+user._id}>
                        <div className="flex-row room-name">
                            <span className="icon-container">
                            <MessageIcon/>
                            </span>
                            <span className="username">
                                {user.username}
                            </span>
                        </div>
                    </Link>
            ))}
        </div>
    ) : null
}

export default Privates
