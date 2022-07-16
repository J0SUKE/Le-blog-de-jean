import React, { useEffect,useState } from 'react'
import styles from './Menu.module.scss';

export default function Menu({toggler,options,setState}) {
   
  const [active,setActive] = useState(false);  

  useEffect(()=>{    

    let toggle = ()=>{
        setActive(active=>!active);    
    }
    let close = (e)=>{        
        
        if (!e.target.closest(`.menu_toggler`)) 
        {
            setActive(false);
        }
    }

    window.addEventListener('click',close);
    toggler?.current.addEventListener('click',toggle)

    return ()=>{
        toggler?.current?.removeEventListener('click',toggle);
        window.removeEventListener('click',close);
    }
  },[])

  return (
    <>
        {
            active &&
            <menu className={styles.menu}>
                <ul>
                    {
                        options.map(item=>{
                            return <li 
                                        key={item}
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            setState(item);
                                            setActive(false);
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
