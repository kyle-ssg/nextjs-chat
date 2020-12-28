import React, {FunctionComponent} from "react";
import Login from "./Login"; // we need this to make JSX compile
import Modal from "react-modal";
import {ModalStyles} from "../common/ModalStyles";


type ComponentType = {
    visible:boolean,
    setVisible: (value:boolean)=>void,
    onComplete:()=>void
}

const LoginModal: FunctionComponent<ComponentType> = ({
    visible,
    setVisible,
    onComplete
                                                        }) => {

    return  typeof document === 'undefined'? null:(
        <Modal
            appElement={document.getElementById("__next")}
            style={ModalStyles()}
            isOpen={visible}
            onRequestClose={()=>{
                document.body.classList.add("ReactModal__Body--before-close")
                setVisible(false)
            }}
            onAfterClose={()=>{
                document.body.classList.remove("ReactModal__Body--before-close")
            }}
            contentLabel="Example Modal"
            closeTimeoutMS={500}
        >
            <Login
                onComplete={()=>{
                    setVisible(false);
                    onComplete();
                }}
            />
        </Modal>
    )
}

export default LoginModal
