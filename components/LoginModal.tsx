import React, {FunctionComponent} from "react";
import Login from "./Login"; // we need this to make JSX compile
import Modal from "react-modal";


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

    const customStyles = typeof document === 'undefined' ? {}: {
        overlay: {
            backgroundColor: document.body.classList.contains("dark")?  "rgba(0,0,0,0.36)" : "#c4c4ce5c"
        },
        content : {
            backgroundColor: document.body.classList.contains("dark")?  "rgba(39,39,41,0.36)" : "#ffffff",
            border: 'none',
            minWidth:"400px",
            borderRadius:20,
            top                   : '25%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    return  typeof document === 'undefined'? null:(
        <Modal
            appElement={document.getElementById("__next")}
            style={customStyles}
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
