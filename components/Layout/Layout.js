import React, { useEffect, useRef, useState } from 'react'
import Header from '../Header/Header';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router'
import Footer from '../Footer/Footer';
import Head from 'next/head';
import { logsinModaleContext } from '../../context/LogModaleContext';
import { useContext } from 'react';
import Login from '../Login/Login';
import SignUp from '../Signup/Signup'


export default function Layout({children}) {
  
    // routing
    const router = useRouter()
    useEffect(()=>{
        parallax.current.scrollTo(0,0);
    },[router.asPath])
    
    //layout
    const parallax = useRef();
    const [scrollbarWidth,setscrollbarWidth] = useState(0);
    useEffect(()=>{
        setscrollbarWidth(parallax.current.offsetWidth - parallax.current.clientWidth);
    },[])

    //login modale
    const {modale} = useContext(logsinModaleContext);

    return (
        <>
            <Head>
                <link rel="icon" type="image/x-icon" href="favicon.svg"/>
            </Head>
            {
                modale=='login' ?
                <Login/>
                :
                modale=='signup' ?
                <SignUp/>
                :
                null
            }
            <Header scrollbarWidth={scrollbarWidth}/>
            <main className={styles.parallax_wrapper} ref={parallax}>
                {children}
                <Footer/>
            </main>            
        </>
  )
}
