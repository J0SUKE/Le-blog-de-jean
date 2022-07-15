import React from 'react'
import style from './Comments.module.scss';
import {Usercontext} from '../../context/UserContext';
import { useContext } from 'react';
import { useRef } from 'react';
import Moment from 'react-moment';


export default function Comments({comments}) {
    
    console.log(comments);
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
        <AddComment/>
        {
            comments.length>0 &&
            <div className={style.comments_list}>
                <ul>
                    {
                        comments.map(({attributes})=>{
                            return <Comment user={attributes.user} time={attributes.time} content={attributes.content}/>
                        })
                    }
                </ul>
            </div>
        }
        
    </section>
  )
}


function Comment({user,time,content}) {
    return (
        <li className={style.comment}>
            <div className={style.comment__left}>
                <img src="/images/user.svg" alt="" />
            </div>
            <div className={style.comment__right}>
                <p>{user}</p>
                <span>
                    <Moment format="DD MMMM YYYYY">
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

function AddComment() {
    
    const {user} = useContext(Usercontext);
    
    const comment = useRef();

    function publishComment(e) {
        e.preventDefault();
        let data = {
            data:{
                user:user.email,
                content:comment.current.value,
                time:new Date().getTime(),
            }
        }
        
        fetch('http://localhost:1337/api/comments',{
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
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
                        <textarea type="text" placeholder='Ecrire un commentaire...' ref={comment}/>
                    </div>
                    <div className={style.submit_zone}>
                        <button type='button'>Annuler</button>
                        <input type="submit" value='Publier'/>
                    </div>
                </form>
            </div>            
        </div>
    )
}