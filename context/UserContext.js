import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export const Usercontext = React.createContext();

export default function UserContext({children}) {
    
    const [user,setuser] = useState(null);

    function setUser(user) {
        localStorage.setItem('user',JSON.stringify(user));
        setuser(user);
    }

    useEffect(()=>{
        const usr = localStorage.getItem('user');
        
        if (usr) {
            console.log(JSON.parse(usr));
            setuser(JSON.parse(usr));
        }
    },[])

  
    return (
    <Usercontext.Provider value={{user,setUser}}>
        {children}
    </Usercontext.Provider>
  )
}
