import React from 'react'
import styles from './Header.module.scss';
import Link from 'next/dist/client/link';
import {Usercontext} from '../../context/UserContext';
import { useContext } from 'react';
import UserButton from '../../ui/UserButton/UserButton';
import {logsinModaleContext} from '../../context/LogModaleContext';

export default function Header({scrollbarWidth}) {
  
  const {user} = useContext(Usercontext);
  const {setModale} = useContext(logsinModaleContext);

  return (
    <header>
        <div className={styles.header} style={{width: `calc(100% - ${scrollbarWidth}px)`}}>
            <Link href={'/'}>
              <div className={styles.logo}>
                  <img src="/images/brackets-curly.svg" alt="" />
                  <p>Le blog de Jean</p>
              </div>
            </Link>
            <ul>
                <li><Link href='/blog'><a>Blog</a></Link></li>
                <li><Link href='/contact'><a>Contact</a></Link></li>
                {
                  user ?
                  <UserButton/>                  
                  :
                  <button onClick={()=>{setModale('login')}}>Se connecter</button>
                }
                
            </ul>
        </div>
    </header>
  )
}
