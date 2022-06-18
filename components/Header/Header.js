import React from 'react'
import styles from './Header.module.scss';
import Link from 'next/dist/client/link';

export default function Header({scrollbarWidth}) {
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
                <li><a href='https://jeanmazouni.com/' target='_blank' rel='noreferrer'>Mon portfolio</a></li>
                <li><Link href='/blog'><a>Blog</a></Link></li>
                <li><Link href='/contact'><a>Contact</a></Link></li>
            </ul>
        </div>
    </header>
  )
}
