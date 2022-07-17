import React, { useRef } from 'react'
import style from '../ModaleLayout/ModaleLayout.module.scss';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../Firebase/firebase-config';
import {Usercontext} from '../../context/UserContext';
import { useContext } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../Firebase/firebase-config';
import getColor from '../../utils/colors';
import ModaleLayout from '../ModaleLayout/ModaleLayout';
import { logsinModaleContext } from '../../context/LogModaleContext';
import GoogleLoginButton from '../../ui/GoogleLoginButton/GoogleLoginButton';

export default function Signup() {
    
    const {setUser} = useContext(Usercontext);
    const {setModale} = useContext(logsinModaleContext);

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
            //console.log(user);  
            const id = user.uid;
            
            // ...

            let color = getColor();

            setDoc(doc(db, "users", `${id}`), {
                email:user.email,
                username:username.current.value,
                color:color
            }).then(()=>{
                setUser({
                    ...user,
                    username:username.current.value,
                    color:color
                });
            }).catch((error)=>{
                console.log(error.code);
            });

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    return (
        <ModaleLayout>
            <div className={style.content}>
                <h1>S&apos;inscrire</h1>
                <div>
                    <p>Déja inscrit ? </p>
                    <button onClick={()=>{setModale('login')}}>Se connecter</button>
                </div>
                <form onSubmit={addUser}>
                    <div>
                        <label htmlFor="">Nom d&apos;utilisateur</label>
                        <input type="text" ref={username}/>
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" ref={email}/>
                    </div>
                    <div>
                        <label htmlFor="">Mot de passe</label>
                        <input type="password" ref={password}/>
                    </div>
                    <section className={style.submit}>
                        <input type="submit" value={'S\'inscrire'}/>
                    </section>
                    <section className={style.ssr}>
                        <span>Ou alors</span>
                        <GoogleLoginButton/>
                </section>  
                </form>
            </div>            
        </ModaleLayout>
  )
}
