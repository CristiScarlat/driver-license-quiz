import React, { useState, useEffect } from "react";
import './css/index.css';
import './css/home.css';
import './css/question.css';
import './css/auth.css';
import './css/responsive.css';
import Quiz from './modules/quiz';
import Auth from './modules/auth';
import { auth } from '../firebase/firebase';
import { Alert } from 'react-bootstrap';

const IndexPage = () => {

  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("...loading")
    setLoading(true)
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("isAuthenticated", user)
        setIsAuth(true)
        setCurrentUser(user)
      }
      else {
        console.log("isNotAuthenticated")
        setIsAuth(false)
        setCurrentUser(null)
      }
      setLoading(false)
    })

  }, [])

  function handleLogout() {
    auth.signOut()
  }

  return (
    <main>
      {loading ? '...loading' : isAuth ? <Quiz handleLogout={handleLogout} currentUser={currentUser} /> : <Auth />}
      {/* <Alert variant="danger" dismissible className="alert-style">
        This is a danger alert—check it out!
      </Alert> */}
    </main>
  )
}

export default IndexPage
