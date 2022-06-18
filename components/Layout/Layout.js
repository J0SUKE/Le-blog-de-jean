import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router'
import Footer from '../Footer/Footer';


export default function Layout({children}) {
  
    const router = useRouter()
    useEffect(()=>{
        parallax.current.scrollTo(0,0);
    },[router.asPath])
    
    const parallax = useRef();
    const [scrollbarWidth,setscrollbarWidth] = useState(0);

    useEffect(()=>{
        setscrollbarWidth(parallax.current.offsetWidth - parallax.current.clientWidth);
    },[])
  
    return (
        <>
            <Header scrollbarWidth={scrollbarWidth}/>
            <main className={styles.parallax_wrapper} ref={parallax}>
                {children}
                <Footer/>
            </main>
        </>
  )
}
