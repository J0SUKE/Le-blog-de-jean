import style from './Login.module.scss';
import Link from 'next/link';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../Firebase/firebase-config';
import { useRef,useContext } from 'react';
import {Usercontext} from '../../context/UserContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config';


export default function Login() {
    
    const {setUser} = useContext(Usercontext);
    
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
      <main className={style.container}>
          <form onSubmit={loguser}>
              <div>
                  <label htmlFor="">Email</label>
                  <input type="email" ref={email}/>
              </div>
              <div>
                  <label htmlFor="">Mot de passe</label>
                  <input type="password" ref={password}/>
              </div>
              <input type="submit" value={'se connecter'}/>
          </form>
          <p>Pas encore inscrit ?</p>
          <Link href={'/signup'}>
            <a>
                <button>S&apos;inscrire</button>
            </a>
          </Link>
      </main>
    )
  }
  