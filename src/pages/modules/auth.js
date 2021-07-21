import React from 'react';
import { auth } from '../../firebase/firebase';
import RegisterLoginForm from '../components/registerForm';

const Auth = () => {
    const [error, setError] = React.useState('');

    const handleFormSubmit = async (email, psw) => {
        try {
            await auth.signInWithEmailAndPassword(email, psw)
        } catch (error) {
            setError(error.message || "Somethin went wrong, please try again!")
        }

    }

    return (
        <div className="login-container">
            <div className="auth-container">
                <div className="auth-title">Login:</div>
                <RegisterLoginForm handleFormSubmit={handleFormSubmit} />
            </div>
            <div style={{ color: 'red', marginTop: '1rem'}}>{error}</div>
        </div>
    )
}

export default Auth;