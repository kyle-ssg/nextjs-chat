import React, {FunctionComponent} from 'react';
import _data from "../common/_data";
import Project from "../common/project"; // we need this to make JSX compile

type ComponentType = {
    room:string
}

const AdminActions: FunctionComponent<ComponentType> = ({room}) => {
    return (
        <>
            <div className="flex-row row-center mb-2">
                Actions: <button onClick={()=>{
                    if(window.confirm()) {
                        _data.post(`${Project.api}messages/${room}/clear`,{})
                    }

            }} className="ml-2 btn  btn-sm btn-outline-primary">Clear</button>
            </div>
        </>
    )
}

export default AdminActions
