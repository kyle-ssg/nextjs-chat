import React, {FunctionComponent, useState} from "react";
import safeEventParse from "common/saveEventParse";
import useAuth from "common/useAuth";
import ErrorMessage from "./ErrorMessage"; // we need this to make JSX compile

type ComponentType = {
    onComplete: () => void
}

const Login: FunctionComponent<ComponentType> = ({onComplete}) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const {isLoading,error,login,register} = useAuth();
    const [mode, setMode] = useState<string>("LOGIN")
    const submit = ()=> {
        if(mode === "REGISTER") {
            register(username,password)
                .then(onComplete)
        } else {
            login(username,password)
                .then(onComplete)
        }
    }
    return (
        <>
            <form onSubmit={(e)=>{
                e.preventDefault()
                e.stopPropagation();
                submit();
                return false
            }}>
                <h4 className="mb-4 text-center">
                    {mode === "LOGIN"? "Welcome back.": "Let's sign you up."}

                </h4>
                <div className="input-container-default mb-4">
                    <input
                        placeholder="username"
                        type="text"
                        onChange={(e) => {
                            setUsername(safeEventParse(e));
                        }}
                        value={username}
                    />
                </div>
                <div className="input-container-default mb-4">
                    <input
                        onChange={(e) => {
                            setPassword(safeEventParse(e));
                        }}
                        value={password}
                        placeholder="password"
                        type="password"
                    />
                </div>
                <ErrorMessage>{error}</ErrorMessage>
                <button disabled={isLoading} className="btn btn-primary btn--full-width">
                    {mode === "REGISTER"? "Register" : "Sign in"}
                </button>
                <div className="mt-2 text-center">
                    <a onClick={()=>{
                        setMode(mode==="REGISTER"?"LOGIN":"REGISTER")
                    }} href="#">
                        {mode === "REGISTER"? "Already a member?" : "Not got an account?"}
                    </a>
                </div>
            </form>
        </>
    )
}

export default Login
