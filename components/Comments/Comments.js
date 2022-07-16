import React,{ useRef,useId,useContext,useState } from 'react';
import style from './Comments.module.scss';
import {Usercontext} from '../../context/UserContext';
import Moment from 'react-moment';
import { collection, addDoc,doc, deleteDoc  } from "firebase/firestore"; 
import {db} from '../../Firebase/firebase-config';
import Menu from '../../ui/Menu/Menu';
import { useEffect } from 'react';

// List de tout les commentaires
export default function Comments({comments,slug}) {

    const sort_btn = useRef();
    
    const [comments_list,setComments_list] = useState(comments);
    const [etat,setEtat] = useState();

    return (
    <section className={style.comments_container}>
        <div className={style.comments_container__top}>
            <h2>Commentaires</h2>
            <div className={style.comments_sort}>
                <p>Trier par : </p>
                <span ref={sort_btn}>Plus récents</span>
                <Menu toggler={sort_btn} options={['Le plus ancien','Le plus récent']} setState={setEtat}/>
            </div>
        </div>
        <AddComment slug={slug}  setComments={setComments_list} comments={comments_list}/>
        {
            comments_list.length>0 &&
            <div className={style.comments_list}>
                <ul>
                    {
                        comments_list.map(({user,content,time,id,color})=>{
                            return <Comment  
                                        key={id} 
                                        id={id}
                                        username={user} 
                                        time={time} 
                                        content={content} 
                                        color={color}
                                        setComments_list={setComments_list}
                                    />
                        })
                    }
                </ul>
            </div>
        }
        
    </section>
  )
}

// un commentaire individuel
function Comment({username,time,content,color,id,setComments_list}) {
    
    const edit_btn = useRef();
    
    const actions = useRef(['Modifier','Supprimer']);// actions of the menu
    
    const [action,setAction] = useState(); // last selected action 
    
    const {user} = useContext(Usercontext);

    function deleteComment() {
        deleteDoc(doc(db, "comments", `${id}`))
        .then(()=>{
            setComments_list(comment=>comment.filter(item=>item.id!=id));
        })
        .catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        console.log(action);
        if (action==actions.current[1]) {
            deleteComment();
        }
    },[action])

    return (
        <li className={style.comment}>
            <div className={style.comment__left} style={{background:color}}>
                <p>{username[0]}</p>
            </div>
            <div className={style.comment__right}>
                <p>{username}</p>
                <span>
                    <Moment format="DD MMMM YYYY">
                    {time}
                    </Moment>
                </span>
                <div className={style.comment__right__content}>
                    <p>{content}</p>
                </div>
            </div>
            {
                user && username==user.username &&
                <div className={style.edit}>
                    <div className={`${style.edit_btn} menu_toggler`} ref={edit_btn}>
                        <img src="/images/dots.svg" alt=""/>
                        <Menu  
                            toggler={edit_btn} 
                            options={actions.current} 
                            setState={setAction}
                        />
                    </div>                                            
                </div>
            }
            
        </li>
    )
}

// la zone ou on ajoute un commentaire
function AddComment({slug,setComments,comments}) {
    
    const {user} = useContext(Usercontext);
    
    const comment = useRef();
    const [commenting,setCommenting] = useState(false); // pour toggle la zone des boutons


    function publishComment(e) {
        e.preventDefault();

        let commentData = {
            user: user.username,
            content:comment.current.value,
            time:new Date().getTime(),
            color:user.color
        }

        // ajoute le comm a la database
        addDoc(collection(db, `comments/${slug}/comments`), commentData);        

        // toggle la zone de validation et clear le input
        setCommenting(false);   
        comment.current.value = '';

        // ajoute le noueveau com a l'ui
        setComments(comments=>[commentData,...comments])
    }
    
    return (
        <div className={style.write_a_comments}>
            <div className={style.write_a_comments__left}>
                {
                    user?
                    <div style={{background:user.color}}>
                        {user.email[0]}
                    </div>
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
                            <button 
                                onClick={()=>{
                                    setCommenting(false);
                                    comment.current.value = '';
                                }} 
                                type='button'
                            >Annuler</button>
                            <input type="submit" value='Publier'/>
                        </div>
                    }
                    
                </form>
            </div>            
        </div>
    )
}