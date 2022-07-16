import React, { useEffect,useState } from 'react'
import { useRef } from 'react';
import styles from './Menu.module.scss';

export default function Menu({toggler,options,setAction}) {
   
  const [active,setActive] = useState(false);  
  const menuRef = useRef();

  useEffect(()=>{    

    let toggle = (e)=>{
        e.stopPropagation();
        setActive(active=>!active);        
    }
    let close = (e)=>{        
        setActive(false);
    }

    let keyClose = (e)=>{
        if (e.key=='Escape') {
            setActive(false)
        }
    }

    window.addEventListener('click',close);
    window.addEventListener('keyup',keyClose);
    toggler?.current.addEventListener('click',toggle)

    return ()=>{
        toggler?.current?.removeEventListener('click',toggle);
        window.removeEventListener('click',close);
        window.removeEventListener('keyup',keyClose);
    }
  },[])

  return (
    <>
        {
            active && !menuOpen &&
            <menu className={styles.menu} ref={menuRef}>
                <ul>
                    {
                        options.map(item=>{
                            return <li 
                                        key={item}
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            setActive(false);
                                            setAction(item);
                                        }}
                                    >{item}</li>
                        })
                    }
                </ul>                                
            </menu>
        }
    </>    
  )
}
