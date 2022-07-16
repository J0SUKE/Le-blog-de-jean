import React from 'react'
import styles from './Header.module.scss';
import Link from 'next/dist/client/link';
import {Usercontext} from '../../context/UserContext';
import { useContext } from 'react';

export default function Header({scrollbarWidth}) {
  
  const {user} = useContext(Usercontext);
  
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
                  <div className={styles.userLink} style={{background:user.color}}>
                    {user.email[0]}
                  </div>
                  :
                  <li><Link href='/login'><a>Se connecter</a></Link></li>
                }
                
            </ul>
        </div>
    </header>
  )
}
