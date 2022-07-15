import style from './Login.module.scss';
import Link from 'next/link';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../Firebase/firebase-config';
import { useRef,useContext } from 'react';
import {Usercontext} from '../../context/UserContext';

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
            setUser(user);
            console.log(user);
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
                <button>S'inscrire</button>
            </a>
          </Link>
      </main>
    )
  }
  