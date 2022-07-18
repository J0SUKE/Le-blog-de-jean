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
import { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Signup() {
    
    const {setUser} = useContext(Usercontext);
    const {setModale} = useContext(logsinModaleContext);
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState(null);
    const email = useRef();
    const password = useRef();
    const username = useRef();
    
    function addUser(e) 
    {
        e.preventDefault();   
        setLoading(true);

        if (!verifyInputs()) return;

        // on doit d'abord verifier que le username n'est pas deja pris 
        const q = query(collection(db, "users"), where("username", "==", username.current.value));        
        getDocs(q)
        .then((resp)=>{
            let usernames = [];
            resp.forEach((doc) => {
                usernames.push(doc.data())
            });
            
            if (usernames.length==0) // username disponnible
            {
                addTodb();
            }
            else // username indisponnible
            {
                setErrorMessage('Ce nom d\'utilisateur est indisponible');
                setLoading(false);
            }

        })        
    }

    function verifyInputs() {
        if (username.current.value.length==0) {
            setErrorMessage('Veuillez renseigner un nom d\'utlisateur');
            setLoading(false);
            return false;
        }
        if (username.current.value.length<3) {
            setErrorMessage('Le nom d\'utlisateur doit contenir au moins 3 caractères');
            setLoading(false);
            return false;
        }
        if (email.current.value.length==0) {
            setErrorMessage('Veuillez renseigner une adresse email');
            setLoading(false);
            return false;
        }
        if (password.current.value.length==0) {
            setErrorMessage('Veuillez renseigner un mot de passe');
            setLoading(false);
            return false;
        }

        return true;
    }

    function addTodb() {
        return createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
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
                setModale(null);
            }).catch((error)=>{
                console.log(error.code);
                setLoading(false);
            });

            
        })
        .catch((error) => {
            const errorCode = error.code;

            console.log(error.code);
            if (errorCode=='auth/email-already-in-use') {
                setErrorMessage('Cette adresse email est déja utilisée')
            }
            else if (errorCode=='auth/invalid-email') {
                setErrorMessage('Adresse email invalide');
            }
            else if (errorCode=='auth/internal-error') {
                setErrorMessage('Une erreur est survenue');
            }
            else if (errorCode=='auth/weak-password') {
                setErrorMessage('Votre mot de passe doit contenir au moins 6 caractères');
            }
            else 
            {
                setErrorMessage('Une erreur est survenue');
            }
            setLoading(false);
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
                    {
                        errorMessage && <p className={style.errorMessage}>{errorMessage}</p>
                    }
                    <section 
                        className={`${style.submit} ${loading ? style.loading : ''}`}
                        style={{marginTop: 2 + 'rem' }}
                    >
                        {
                            loading ?
                            <div className={style.lds_dual_ring}></div>
                            :
                            <input type="submit" value={'S\'inscrire'}/>
                        }
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
