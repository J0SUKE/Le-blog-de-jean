import { useContext, useRef } from "react";
import {Usercontext} from "../../context/UserContext";
import Image from "next/image";
import styles from './UserButton.module.scss';
import Menu from '../Menu/Menu';
import { useEffect } from "react";
import { useState } from "react";

export default function UserButton() {
    
    const {user,setUser} = useContext(Usercontext);
    const actions = useRef(['Se déconnecter']);
    const user_btn = useRef();
    const [action,setAction] = useState();

    function logout() {
        setUser(null);        
    }

    useEffect(()=>{
        console.log(action);
        if (action==actions.current[0]) {
            console.log('logout');
            logout();    
        }        
    },[action])
  
    return (
    <>
        {
            user?.photo ?
            <div className={styles.userBtn} style={{background:user.color}}> 
                <div ref={user_btn}>
                    <Image
                        src={user.photo}
                        width={30}
                        height={30}
                    />
                </div>                
                <Menu toggler={user_btn} options={actions.current} setAction={setAction}/>
            </div>                  
            :
            <div className={styles.userBtn} style={{background:user.color}}>
                <p ref={user_btn}>{user.username[0]}</p>
                <Menu toggler={user_btn} options={actions.current} setAction={setAction}/>
            </div>      
        }
    </>
  )
}
