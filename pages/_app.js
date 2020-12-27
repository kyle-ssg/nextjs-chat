import AsyncStorage from '@callstack/async-storage';

import '../styles/index.scss'

AsyncStorage.getItem("darkmode",(err,res)=>{
    if(res==="dark") {
        document.body.classList.add("dark");
    }
})

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
