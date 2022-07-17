import style from '../ModaleLayout/ModaleLayout.module.scss';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../Firebase/firebase-config';
import { useRef,useContext } from 'react';
import {Usercontext} from '../../context/UserContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config';
import { logsinModaleContext } from '../../context/LogModaleContext';
import ModaleLayout from '../ModaleLayout/ModaleLayout';
import GoogleLoginButton from '../../ui/GoogleLoginButton/GoogleLoginButton';

export default function Login() {
    
    const {setUser} = useContext(Usercontext);
    const {setModale} = useContext(logsinModaleContext);

    const email = useRef();
    const password = useRef();
    
    function loguser(e) {
        
        e.preventDefault();
        
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
                }
            }).catch(error=>{
                console.log(error);
            })
        
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

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
                <button>Mot de passe oublié ?</button>
                <section className={style.submit}>
                    <input type="submit" value={'se connecter'}/>
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
  