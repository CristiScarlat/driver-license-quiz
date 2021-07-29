import React from 'react';
import { auth } from '../../firebase/firebase';
import RegisterLoginForm from '../components/registerForm';
import { Spinner } from 'react-bootstrap';

const Auth = () => {
    const [error, setError] = React.useState('');
    const [spinner, setSpinner] = React.useState(false);

    const handleFormSubmit = async (email, psw) => {
        setSpinner(true)
        try {
            await auth.signInWithEmailAndPassword(email, psw)
            setSpinner(false)
        } catch (error) {
            setError(error.message || "Somethin went wrong, please try again!")
            setSpinner(false)
        }

    }

    return (
        <div className="login-container">
            <div className="auth-container">
                <div className="auth-title">Login:</div>
                <RegisterLoginForm handleFormSubmit={handleFormSubmit} />
            </div>
            {spinner && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
        </div>
    )
}

export default Auth;