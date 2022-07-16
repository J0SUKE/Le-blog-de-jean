import React from 'react'
import style from './Comments.module.scss';
import {Usercontext} from '../../context/UserContext';
import { useContext } from 'react';
import { useRef } from 'react';
import Moment from 'react-moment';
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../../Firebase/firebase-config';
import { useState } from 'react';

// List de tout les commentaires
export default function Comments({comments,slug}) {
    
    const {user} = useContext(Usercontext);
  
    return (
    <section className={style.comments_container}>
        <div className={style.comments_container__top}>
            <h2>Commentaires</h2>
            <div className={style.comments_sort}>
                <p>Trier par : </p>
                <span>Plus récents</span>
            </div>
        </div>
        <AddComment slug={slug}/>
        {
            comments.length>0 &&
            <div className={style.comments_list}>
                <ul>
                    {
                        comments.map(({user,content,time,id})=>{
                            return <Comment key={id} user={user} time={time} content={content}/>
                        })
                    }
                </ul>
            </div>
        }
        
    </section>
  )
}

// un commentaire individuel
function Comment({user,time,content}) {
    return (
        <li className={style.comment}>
            <div className={style.comment__left}>
                <img src="/images/user.svg" alt="" />
            </div>
            <div className={style.comment__right}>
                <p>{user}</p>
                <span>
                    <Moment format="DD MMMM YYYY">
                    {time}
                    </Moment>
                </span>
                <div className={style.comment__right__content}>
                    <p>{content}</p>
                </div>
            </div>
        </li>
    )
}

// la zone ou on ajoute un commentaire
function AddComment({slug}) {
    
    const {user} = useContext(Usercontext);
    
    const comment = useRef();
    const [commenting,setCommenting] = useState(false);

    function publishComment(e) {
        e.preventDefault();

        addDoc(collection(db, `comments/${slug}/comments`), {
            user: user.username,
            content:comment.current.value,
            time:new Date().getTime()
          });        
        
          setCommenting(false);
    }
    
    return (
        <div className={style.write_a_comments}>
            <div className={style.write_a_comments__left}>
                {
                    user?
                    <div>{user.email[0]}</div>
                    :
                    <img src="/images/user.svg" alt="" />
                }
                
            </div>            
            <div className={style.write_a_comments__right}>
                <form onSubmit={publishComment}>
                    <div>
                        <textarea type="text" placeholder='Ecrire un commentaire...' ref={comment} onClick={()=>setCommenting(true)}/>
                    </div>
                    {
                        commenting &&
                        <div className={style.submit_zone}>
                            <button onClick={()=>setCommenting(false)} type='button'>Annuler</button>
                            <input type="submit" value='Publier'/>
                        </div>
                    }
                    
                </form>
            </div>            
        </div>
    )
}