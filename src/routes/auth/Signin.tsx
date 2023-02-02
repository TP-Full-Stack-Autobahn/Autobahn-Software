import React, {useContext, useEffect, useState} from "react";

import SignInComponent from "../../components/SignInComponent";
import LoadingComponent from "../../components/LoadingComponent";

import {AppContext} from "../../core/contexts/AppContext";

import "../../styles/pages/auth/signin.scss";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
    const {apiUrl, user, setToken} = useContext(AppContext)
    const [loading, setLoading] = useState<boolean>(false)
    
    const navigate = useNavigate()

    
    const handleSignIn = (data: FormData) => {
        setLoading(true)
        const body = {
            email: data.get('email'),
            password: data.get('password'),
        }
        fetch(`${apiUrl}/.user/login`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        }).then(r => {
            if (r.ok) {
                return r.json()
            }
            throw new Error('Erreur')
        }).then((payload: {token: string}) => {
            localStorage.setItem('token', payload.token)
            setLoading(false)
            setToken(payload.token)
        }).catch(e => {
            setLoading(false)
            console.log(e)
        })
    }

    useEffect(() => {
        if(typeof user !== "undefined" && user !== null) {
            navigate('/')
        }
    }, [user])

    if(typeof user === "undefined") {
        return <LoadingComponent title="Authentification en cours.." />
    }

    return (
        <>
            <section className="signin-form-container"> 
                <SignInComponent loading={loading} onSubmit={data => handleSignIn(data)} />
            </section>
        </>
  )
}

export default SignIn
