import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router'
import Footer from '../Footer/Footer';
import Head from 'next/head';


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
            <Head>
                <link rel="icon" type="image/x-icon" href="favicon.svg"/>
            </Head>
            <Header scrollbarWidth={scrollbarWidth}/>
            <main className={styles.parallax_wrapper} ref={parallax}>
                {children}
                <Footer/>
            </main>
        </>
  )
}
