import React, {FunctionComponent, useState} from 'react'; // we need this to make JSX compile

type ComponentType = {
    onSubmit:(value:string)=>void
}

const Input: FunctionComponent<ComponentType> = ({onSubmit}) => {
    const [text, setText] = useState<string>("")

    return (
        <form onSubmit={async (e)=>{
            e.preventDefault();
            onSubmit(text);
            setText("")
        }}>
            <div className="input-container">
                <input value={text}
                       onChange={(e)=>setText(e.target.value)}
                       type="text"
                />
            </div>
        </form>

    )
}

export default Input
