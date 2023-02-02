import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigateBackComponent.scss";

type NavigateBackProps = {
    label?: string;
    className?: string;
}

const NavigateBackComponent:React.FC<NavigateBackProps> = (props) => {
    const navigate = useNavigate();
    const { label, className } = props;
    
    return <p className={`navigate-back ${className && `${className}`}`} onClick={() => {navigate(-1)}}>←<span className="label">{label ? label : "retour"}</span></p>
}

export default NavigateBackComponent