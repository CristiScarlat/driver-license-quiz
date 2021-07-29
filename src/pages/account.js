import React, { useEffect, useState, useRef } from 'react';
import firebase, { auth } from '../firebase/firebase';
import { Form, Button, Alert } from 'react-bootstrap';
import { navigate } from 'gatsby';

const AccountPage = () => {
    const [alertMsg, setAlertMsg] = useState('');
    const [currentUser, setCurrentUser] = useState();
    const [displayName, setDisplayName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('danger');

    const oldPswRef = useRef();
    const newPswRef = useRef();
    const newReEnterPswRef = useRef();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setCurrentUser(user)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });

    }, [])

    useEffect(() => {
        if (alertMsg || alertMsg !== '') {
            setShowAlert(true);
            const alertTimer = setTimeout(() => {
                setShowAlert(false);
                setAlertMsg('')
                clearTimeout(alertTimer)
            }, 3000)
        }
    }, [alertMsg])

    async function handleRequestPswChange() {
        console.log(currentUser.email, oldPswRef.current.value, newPswRef.current.value, newReEnterPswRef.current.value)
        const credentials = firebase.auth.EmailAuthProvider.credential(currentUser.email, oldPswRef.current.value)

        function changePassword() {
            if (newPswRef.current.value && newPswRef.current.value !== '') {
                currentUser.updatePassword(newPswRef.current.value).then(() => {
                    setAlertMsg('Update password successful')
                    setAlertType('success')
                }).catch((error) => {
                    setAlertMsg(error.message)
                    setAlertType('danger')
                });
            }
        }

        function checkNewPsw() {
            if (newPswRef.current.value !== newReEnterPswRef.current.value) {
                setAlertMsg('The new password and re-entered password does not match, please try again!')
            }
            else {
                changePassword()
            }
        }

        currentUser.reauthenticateWithCredential(credentials).then((res) => {
            console.log('User re-authenticated', { res })
            checkNewPsw()
        }).catch((alertMessage) => {
            console.log(alertMessage)
            setAlertMsg(alertMessage.message)
            setAlertType('danger')
        });

    }

    async function handleUpdateDisplayName() {
        if (!displayName || displayName === '') {
            setAlertMsg('Display name cannot be empty.')
            setAlertType('danger')
            return
        }
        currentUser.updateProfile({
            displayName: displayName,
        }).then(() => {
            console.log('Display name updated successful !')
            setAlertType('success')
            setAlertMsg('Display name updated successful !')
        }).catch((error) => {
            console.log(error)
            setAlertMsg(error.message)
            setAlertType('danger')
        });
    }

    function handleNameChange(e) {
        setDisplayName(e.target.value)
    }

    return (
        <div className="settings-wrapper">
            <Form className="p-5">
                <Button className="mt-2 mb-5" onClick={() => navigate('/')}>zurück</Button>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Display Name</Form.Label>
                    <div className="d-flex">
                        <Form.Control type="text" placeholder="Enter display name" value={displayName || currentUser?.displayName || ''} name='displayName' onChange={handleNameChange} />
                        <Button variant="primary" className="ms-3" onClick={handleUpdateDisplayName}>
                            Update Display Name
                        </Button>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={currentUser?.email || ''} readOnly={true} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <div className="account-change-psw-container">
                    <Form.Group className="mb-3" controlId="formBasicOldPassword">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Old Password" ref={oldPswRef} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter New Password" ref={newPswRef} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicReEnterNewPassword">
                        <Form.Label>Re-enter New Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter New Password" ref={newReEnterPswRef} />
                    </Form.Group>

                    <Button variant="primary" onClick={handleRequestPswChange}>
                        Change Password
                    </Button>
                </div>
            </Form>
            <Alert variant={alertType} dismissible className="alert-style" show={showAlert} onClose={() => setShowAlert(false)}>
                {alertMsg}
            </Alert>
        </div>
    )
}

export default AccountPage;