import React from 'react';
import { auth } from '../../firebase/firebase';
import RegisterLoginForm from '../components/registerForm';

const Auth = () => {
    const [error, setError] = React.useState('');
    const [authType, setAuthType] = React.useState('login');

    const registerTextBtn="Or register if you do not have an account yet"
    const loginTextBtn="and go to login"

    const handleFormSubmit = async (email, psw) => {
        try {
            if(authType === 'login'){
                const res = await auth.signInWithEmailAndPassword(email, psw)
            } else if(authType === 'register'){
                const res = await auth.createUserWithEmailAndPassword(email, psw)
            } 
        } catch (error) {
            setError(error.message || "Somethin went wrong, please try again!")
        }

    }

    const handleSwitchRegisterLogin = () => {
        if(authType === 'login')setAuthType('register')
        else setAuthType('login')
    }

    return (
        <div className="login-container">
            <div className="auth-container">
                <div className="auth-title">{authType}</div>
                <RegisterLoginForm handleFormSubmit={handleFormSubmit} />
            </div>
            <div style={{ color: 'red', marginTop: '1rem'}}>{error}</div>
            <button onClick={handleSwitchRegisterLogin} className="register-button">
                {authType === 'login' ? registerTextBtn : loginTextBtn}
            </button>
        </div>
    )
}

export default Auth;