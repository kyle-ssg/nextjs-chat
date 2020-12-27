import React, {FunctionComponent} from 'react'; // we need this to make JSX compile

type ComponentType = {}

const ErrorMessage: FunctionComponent<ComponentType> = ({children}) => {
    if (!children) {
        return null
    }
    return (
        <div className="alert alert-danger">
            {typeof children === "string" ? children : "Error processing request"}
        </div>
    )
}

export default ErrorMessage
