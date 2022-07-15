import React, { useRef } from 'react'
import style from './Signup.module.scss';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../Firebase/firebase-config';
import {Usercontext} from '../../context/UserContext';
import { useContext } from 'react';

export default function Signup() {
    
    const {setUser} = useContext(Usercontext);

    const email = useRef();
    const password = useRef();
    const username = useRef();
    
    function addUser(e) 
    {
        e.preventDefault();   

        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setUser(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    return (
    <main className={style.container}>
        <form onSubmit={addUser}>
            <div>
                <label htmlFor="">username</label>
                <input type="text" ref={username}/>
            </div>
            <div>
                <label htmlFor="">email</label>
                <input type="email" ref={email}/>
            </div>
            <div>
                <label htmlFor="">password</label>
                <input type="password" ref={password}/>
            </div>
            <div>
                <input type="submit" value="s'inscrire" />
            </div>
        </form>
    </main>
  )
}