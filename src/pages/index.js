import React, { useState, useEffect } from "react";
import './css/index.css';
import './css/home.css';
import './css/question.css';
import './css/auth.css';
import './css/responsive.css';
import Quiz from './modules/quiz';
import Auth from './modules/auth';
import { auth } from '../firebase/firebase';

const IndexPage = () => {

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(function(user){
        if(user){
            console.log("isAuthenticated", user)
            setIsAuth(true)
        }
        else{
            console.log("isNotAuthenticated")
            setIsAuth(false)
        }
    })

 })

 function handleLogout() {
   auth.signOut()
 }
  
  return (
    <main>
     {isAuth ? <Quiz handleLogout={handleLogout}/> : <Auth/>}
    </main>
  )
}

export default IndexPage
