import React, {FunctionComponent} from 'react'; // we need this to make JSX compile

type ComponentType = {}

const UserList: FunctionComponent<ComponentType> = ({}) => {
    return (
        <>
            <div className="input-container-default input-container-sm">
                <input placeholder="Search..." type="text"/>
            </div>
        </>
    )
}

export default UserList
