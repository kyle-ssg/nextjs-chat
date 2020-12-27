import React, {FunctionComponent, useState} from "react";
import {useGlobalState} from "common/state";
import LoginModal from "./LoginModal"; // we need this to make JSX compile

type ComponentType = {
    onSubmit:(value:string)=>void
}

const Input: FunctionComponent<ComponentType> = ({onSubmit}) => {
    const [text, setText] = useState<string>("")
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const state = useGlobalState();
    const submit = ()=>{
        const user = state.get().user;
        if(!user) {
            setShowLogin(true);
            return;
        }
        onSubmit(text);
        setText("")
    }
    return (
        <>
            <form onSubmit={async (e)=>{
                e.preventDefault();
                submit()
            }}>
                <div className="input-container">
                    <input value={text}
                           onChange={(e)=>setText(e.target.value)}
                           type="text"
                    />
                </div>
            </form>
            <LoginModal visible={showLogin} setVisible={setShowLogin} onComplete={submit}/>
        </>
    )
}

export default Input
