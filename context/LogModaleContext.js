import React from 'react'
import { useState } from 'react';

export const logsinModaleContext = React.createContext();

export default function LogModaleContext({children}) {
    
    const [modale,setModale] = useState(null);
  
    return (
    <logsinModaleContext.Provider value={{modale,setModale}}>
        {children}
    </logsinModaleContext.Provider>
  )
}
