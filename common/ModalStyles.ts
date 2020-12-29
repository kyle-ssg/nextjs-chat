export const ModalStyles = ()=>{
    return typeof document === 'undefined' ? {}: {
        overlay: {
            backgroundColor: document.body.classList.contains("dark")?  "rgba(0,0,0,0.36)" : "#c4c4ce5c"
        },
        content : {
            backgroundColor: document.body.classList.contains("dark")?  "rgba(39,39,41,1)" : "#ffffff",
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
}
export const ModalStylesAvatar = ()=>{
    return typeof document === 'undefined' ? {}: {
        overlay: {
            backgroundColor: document.body.classList.contains("dark")?  "rgba(0,0,0,0.36)" : "#c4c4ce5c"
        },
        content : {
            backgroundColor: document.body.classList.contains("dark")?  "rgba(39,39,41,1)" : "#ffffff",
            border: 'none',
            borderRadius:20,
            minWidth: Math.min(typeof document!=="undefined" && document.body.clientWidth-80,500),
            height: typeof document!=="undefined" && document.body.clientHeight/2,
            top                   : '25%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : '25%',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };
}
