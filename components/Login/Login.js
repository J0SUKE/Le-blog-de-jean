import style from '../ModaleLayout/ModaleLayout.module.scss';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../Firebase/firebase-config';
import { useRef,useContext } from 'react';
import {Usercontext} from '../../context/UserContext';
import { doc, getDoc,collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config';
import { logsinModaleContext } from '../../context/LogModaleContext';
import ModaleLayout from '../ModaleLayout/ModaleLayout';
import GoogleLoginButton from '../../ui/GoogleLoginButton/GoogleLoginButton';
import { useState } from 'react';

export default function Login() {
    
    const {setUser} = useContext(Usercontext);
    const {setModale} = useContext(logsinModaleContext);
    const [errorMessage,setErrorMessage] = useState(null);
    const [loading,setLoading] = useState(false);

    const email = useRef();
    const password = useRef();
    
    function loguser(e) {
        
        e.preventDefault();
        setLoading(true);

        if (email.current.value.length==0) {
            setErrorMessage('Veuillez saisir une adresse email');
            setLoading(false);
            return;
        }
        if (password.current.value.length==0) {
            setErrorMessage('Veuillez saisir un mot de passe');
            setLoading(false);
            return;
        }

        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const userDoc = doc(db, "users", `${user.uid}`);
            
            getDoc(userDoc)
            .then((resp)=>{
                if (resp.exists()) 
                {
                    setUser({
                        ...user,
                        username:resp.data().username,
                        color:resp.data().color,
                    })
                    setModale(null);
                }
            }).catch(error=>{
                console.log(error);
                setLoading(false);
            })
        
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode=='auth/wrong-password') {
                setErrorMessage('Mot de passe incorrect');
            }            
            else if (errorCode=='auth/user-not-found') {
                setErrorMessage('Utilisateur introuvable');
            }
            else if (errorCode=='auth/invalid-email') {
                setErrorMessage('Adresse email invalide');
            }
            else 
            {
                setErrorMessage('Une erreur est survenue');
            }
            setLoading(false);
            console.log(errorCode);
        });
    }
    
    return (
        <ModaleLayout>
            <div className={style.content}>
                <h1>Se connecter</h1>
                <div>
                    <p>Nouveau sur le site ? </p>
                    <button onClick={()=>{setModale('signup')}}>S&apos;inscrire</button>
                </div>
                
                <form onSubmit={loguser}>
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
                <button>Mot de passe oublié ?</button>
                <section className={`${style.submit} ${loading ? style.loading : ''}`}>                    
                    {
                        loading ?
                        <div className={style.lds_dual_ring}></div>
                        :
                        <input type="submit" value={'se connecter'}/>
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
  