import React, {FormEvent, useState} from "react";
import "./SignInComponent.scss";
import {ButtonComponent, InputComponent} from "autobahn-ui";

type SignUpProps = {
    loading: boolean,
    onSubmit: (formData: FormData) => void
}

const SignInComponent:React.FC<SignUpProps> = (props) => {
    const {onSubmit, loading} = props
    const [idError, setIdError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formError:boolean = false
        setIdError('')
        setPasswordError('')

        // @ts-ignore
        const formData = new FormData(e.target)

        if (!formData.get('email')) {
            setIdError('Veuillez entrer votre identifiant.')
            formError = true
        }
        if (!formData.get('password')) {
            setPasswordError('Veuillez entrer votre mot de passe.')
            formError = true
        }

        if (formError) {
            return
        }

        onSubmit(formData)
    }

    return (
        <form className="signin-form" onSubmit={e => handleSubmit(e)}>
            <h1 className="title">Connexion</h1>

            <div className="input-container">
                <InputComponent type="text" name="email" label="Identifiant" />
                {idError && <p className="error">{idError}</p>}
            </div>

            <div className="input-container">
                <InputComponent type="password" name="password" label="Mot de passe" />
                {passwordError && <p className="error">{passwordError}</p>}
            </div>

            <ButtonComponent loading={loading} className="submit-btn">Connexion</ButtonComponent>
        </form>
    )
}

export default SignInComponent