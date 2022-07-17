import React from 'react'
import style from './GoogleLoginButton.module.scss';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,provider } from '../../Firebase/firebase-config';
import {Usercontext} from '../../context/UserContext';
import { useContext } from 'react';
import { logsinModaleContext } from '../../context/LogModaleContext';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../Firebase/firebase-config';

export default function GoogleLoginButton() {
  
    const {setUser} = useContext(Usercontext);
    const {setModale} = useContext(logsinModaleContext);
    
    function googleSignIn() {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);

            setDoc(doc(db, "users", `${user.uid}`), {
                email:user.email,
                username:user.displayName,
                photo:user.photoURL
            }).then(()=>{
                setUser({
                    ...user,
                    username:user.displayName,
                    photo:user.photoURL
                });
                setModale(null);
            }).catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });


            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;            
            console.log(errorCode);
            console.log(errorMessage);
            // ...
          });
    }
  
    return (
    <button 
        className={style.button}
        onClick={googleSignIn}
    >
        <img src="/images/google.svg" alt="" />
        Se connecter avec Google
    </button>
  )
}
