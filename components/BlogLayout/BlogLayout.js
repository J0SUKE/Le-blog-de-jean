import React from 'react'
import styles from './BlogLayout.module.scss';

export default function BlogLayout({children}) {
  return (
    <>
        <div className={styles.intro}>
            <img src="/images/bg.jpg" alt="" className={styles.intro__bg}/>
            <img src="/images/brackets-curly.svg" alt="" className={styles.intro__logo}/>
        </div>
        {children}
    </>
  )
}
