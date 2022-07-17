import { useContext } from "react"
import { logsinModaleContext } from "../../context/LogModaleContext"
import styles from './LoginSignUpButton.module.scss';

export default function LoginSignUpButton() {
    
    const {setModale} = useContext(logsinModaleContext);
    return (
        <button className={styles.button} onClick={()=>{setModale('login')}}>
            Se connecter / S'inscrire
        </button>
  )
}
