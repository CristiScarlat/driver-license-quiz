import React from 'react'
import { Form, Button } from 'react-bootstrap';


const RegisterLoginForm = ({ handleFormSubmit }) => {

    const emailRef = React.useRef()
    const pswRef = React.useRef()

    return (
        <Form>
            <Form.Group className="mb-0" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={pswRef}/>
            </Form.Group>

            <Button variant="primary" onClick={(e) => {e.preventDefault(); handleFormSubmit(emailRef.current.value, pswRef.current.value)}}>
                Submit
            </Button>
        </Form>
    )
}

export default RegisterLoginForm;