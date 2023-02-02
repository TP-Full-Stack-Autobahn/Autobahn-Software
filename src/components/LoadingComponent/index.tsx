import React from "react";
import "./LoadingComponent.scss";


type LoadingComponentProps = {
    title: string
}
const LoadingComponent:React.FC<LoadingComponentProps> = (props) => {
    const {title} = props

    return (
        <section className="container">
            <h1>{title}</h1>
        </section>
    )
}

export default LoadingComponent