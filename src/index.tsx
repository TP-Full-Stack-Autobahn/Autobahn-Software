import React, {useEffect, useState} from "react";
import { createBrowserRouter, Route, Routes, HashRouter, Outlet } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import { AppContext } from "./core/contexts/AppContext";

import {UserProps} from "./core/types";

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Home from "./routes/home";
import SignIn from "./routes/auth/Signin";
import CarListing from "./routes/car/List";
import CarShow from "./routes/car/Show";

import "../src/styles/globals.scss";
import "autobahn-ui/dist/app.css";


type AppProps = {
    children?: any;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />,
    },
]);

const App = ({ children }: AppProps) => {
    const apiUrl = "http://localhost:8000/api"
    const [user, setUser] = useState<undefined | null | UserProps>(undefined)
    const [token, setToken] = useState<string|null|undefined>(undefined)

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [])

    useEffect(() => {
        if (typeof token !== "undefined") {
            fetch(`${apiUrl}/.user/user`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            }).then(r => {
                if (r.ok) {
                    return r.json()
                }
                throw new Error('Erreur')
            }).then((user: UserProps) => {
                user.token = token
                setUser(user);
                if(user.isAdmin) {
                    // void router.push("/admin")
                }
            }).catch(() => {
                setUser(null)
            })
        } else if(token === null) {
            setUser(null)
        }
    }, [token])

    return (
        <AppContext.Provider
            value={{
                apiUrl: apiUrl,
                user,
                setUser,
                token,
                setToken,
            }}>
            <main className="">
                {children}
            </main>
        </AppContext.Provider>
    )
}

export default App;

const Base:React.FC = () => {
    return ( 
        <>
            <HeaderComponent/>
            <Outlet />
            <FooterComponent />
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Base />}>
                    <Route index element={<Home/>} />
                    <Route path="signin" element={<SignIn/>} />
                    <Route path="cars">
                        <Route index element={<CarListing />} />
                        <Route path=":cardId" element={<CarShow />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    </App>
  </React.StrictMode>,
)