import { useContext } from "react"
import { logsinModaleContext } from "../../context/LogModaleContext"
import style from './ModaleLayout.module.scss';

export default function ModaleLayout({children}) {
    
    const {setModale} = useContext(logsinModaleContext);

    return (
    <main className={style.container}>
      <div className={style.container__top}>
        <button onClick={()=>{setModale(null)}}>+</button>
      </div>        
      {children}
    </main>
  )
}
