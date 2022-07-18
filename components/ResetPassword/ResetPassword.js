import ModaleLayout from "../ModaleLayout/ModaleLayout"
import style from '../ModaleLayout/ModaleLayout.module.scss';
import {  sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/firebase-config";
import { useState,useRef } from "react";

export default function ResetPassword() {
  
    const [errorMessage,setErrorMessage] = useState(null);
    const [loading,setLoading] = useState(false);
    const [succes,setSucces] = useState(false);

    const email = useRef();

    function sendLink(e) {
        e.preventDefault();
        setLoading(true);
        sendPasswordResetEmail(auth, email.current.value)
        .then(() => {
            setSucces(true);
            setErrorMessage(null);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            if(errorCode=="auth/invalid-email")
            {
                setErrorMessage("Invalid email format");
            }
            if(errorCode=="auth/user-not-found")
            {
                setErrorMessage("Utilisateur introuvable");
            }
            
          });
    }
  
    return (
    <ModaleLayout>
        <div className={style.content}>
                <h1>Mot de passe oublié ?</h1>
                <div>
                    <p>Nous allons vous envoyer un lien par email pour réinitialiser votre mot de passe</p>
                </div>
                
                <form onSubmit={sendLink}>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" ref={email}/>
                </div>
                {
                    errorMessage && <p className={style.errorMessage}>{errorMessage}</p>
                }
                <section 
                    className={`${style.submit} ${loading ? style.loading : ''} ${succes ? style.succes : ''}`}
                    style={{marginTop:1 + 'rem'}}
                >                    
                    {
                        succes ?
                        <div className={style.succes}>Email envoyé</div>
                        :
                        loading ?
                        <div className={style.lds_dual_ring}></div>
                        :
                        <input type="submit" value={'Envoyer un lien'}/>
                    }
                </section>
            </form>
            </div>
    </ModaleLayout>
  )
}
