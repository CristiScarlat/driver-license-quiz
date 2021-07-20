import React from 'react'
import './css/registerForm.css'


const RegisterLoginForm = ({ handleFormSubmit }) => {

    const emailRef = React.useRef()
    const pswRef = React.useRef()

    return(
        <form className="form-auth">
            <label htmlFor="input-email">Email</label>
            <input type="email" ref={emailRef}></input>
            <label htmlFor="input-psw">Password</label>
            <input type="password" ref={pswRef}></input>
            <button className="form-auth-submit-btn" onClick={(e) => {e.preventDefault(); handleFormSubmit(emailRef.current.value, pswRef.current.value)}}>Submit</button>
        </form>
    )
}

export default RegisterLoginForm;