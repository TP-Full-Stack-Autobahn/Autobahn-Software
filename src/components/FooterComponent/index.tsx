import React from "react";
import "./FooterComponent.scss";


const FooterComponent:React.FC = () => {
    return (
        <footer className="footer">
            <ul>
                <a>
                    <li>Contact</li>
                </a>
                <a>
                    <li>Conditions générales d'utilisation (CGU)</li>
                </a>
            </ul>
            <p>Autobahn {new Date().getFullYear()} - Tout droits reservés</p>
        </footer>
    )
}

export default FooterComponent