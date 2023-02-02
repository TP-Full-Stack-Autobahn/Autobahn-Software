import React, {useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import {ButtonComponent} from "autobahn-ui";
import {AppContext} from "../../core/contexts/AppContext";

import "./HeaderComponent.scss";

const HeaderComponent:React.FC = () => {
    const {user} = useContext(AppContext)
    const location = useLocation();
    
    console.log(user);
    
    return (
        <header className="header">
            <Link to="/">
                <div className="logo-container">
                    <img src="/media/header/logo.svg" alt="Autobahn logo" width="42" height="42" />
                    <h1 style={{fontFamily: 'Bayon, Regular'}}>Autobahn</h1>
                </div>
            </Link>
            <nav className="nav">
                <ul>
                    <li>
                        {user  &&
                            <Link to="cars">
                                <span>voitures</span>  
                            </Link>
                        }
                    </li>
                </ul>
            </nav>
            {typeof user === 'undefined' || user === null && location.pathname !== "/signin"  &&
                <Link to="signin">
                    <ButtonComponent className="btn">
                        <img src="/media/header/signin.svg" alt="Sign in" width="23" height="23" />
                        <span>Connexion</span>
                    </ButtonComponent>
                </Link>
            }
        </header>
    )
}

export default HeaderComponent