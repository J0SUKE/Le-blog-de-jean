import React,{ useRef,useId,useContext,useState } from 'react';
import style from './Comments.module.scss';
import {Usercontext} from '../../context/UserContext';
import Moment from 'react-moment';
import { collection, addDoc,doc, deleteDoc, query, getDocs,orderBy  } from "firebase/firestore"; 
import {db} from '../../Firebase/firebase-config';
import Menu from '../../ui/Menu/Menu';
import { useEffect } from 'react';
import {logsinModaleContext} from '../../context/LogModaleContext';
import Image from 'next/image';

// List de tout les commentaires
export default function Comments({slug}) {

    const sort_btn = useRef();
    
    const [comments_list,setComments_list] = useState([]);
    const sorts = useRef(['Le plus ancien','Le plus récent'])
    const [sort,setSort] = useState(sorts.current[1]);
    const [errorMessage,setErrorMessage] = useState(null);

    function getComments(order) {
        //get the comments from Firebase
        const q = query(collection(db, `comments/${slug}/comments`),orderBy("time", order));
        let comms = [];

        getDocs(q)
        .then((resp)=>{
            resp.forEach((doc) => 
            {
                comms.push({...doc.data(),id:doc.id});
            });
            setComments_list(comms);     
        }).catch((error)=>{
            console.log(error);
            setErrorMessage('Une erreur est survenue');
        })
        
    }

    useEffect(()=>{
        getComments("desc");// load the comments from the database
    },[])

    useEffect(()=>{
        if (sort==sorts.current[0]) // Le plus ancien
        {
            getComments("asc")
        }
        else // par défault le plus récent
        {
            getComments("desc")
        }
    },[sort])

    return (
    <section className={style.comments_container}>
        <div className={style.comments_container__top}>
            <h2>Commentaires</h2>
            <div className={style.comments_sort}>
                <p>Trier par : </p>
                <span ref={sort_btn}>{sort}
                    <img src="/images/angle-down.svg" alt="" />
                </span>
                <Menu 
                    toggler={sort_btn} 
                    options={sorts.current} 
                    setAction={setSort} 
                    state={sort} 
                />
            </div>
        </div>
        <AddComment slug={slug}  setComments={setComments_list} sort={sort} sorts={sorts}/>
        {
            comments_list.length>0 &&
            <div className={style.comments_list}>
                <ul>
                    {
                        comments_list.map(({user,content,time,id,color,photo})=>{
                            return <Comment  
                                        key={id} 
                                        id={id}
                                        username={user} 
                                        time={time} 
                                        content={content} 
                                        color={color}
                                        photo={photo}
                                        setComments_list={setComments_list}
                                        slug={slug}
                                    />
                        })
                    }
                </ul>                
            </div>
        }
        {
            errorMessage && 
            <div className={style.errorMessage}>
                <p>{errorMessage}</p>
            </div>
        }

    </section>
  )
}

// un commentaire individuel
function Comment({username,time,content,color,photo,id,setComments_list,slug}) {
    
    // id : id du documments dans la bdd

    const edit_btn = useRef();    
    
    const {user} = useContext(Usercontext);
    const [action,setAction] = useState();


    function deleteComment() {
        console.log('delete comment with id ',id);
        deleteDoc(doc(db, `comments/${slug}/comments`, `${id}`))
        .then(()=>{
            setComments_list(comment=>comment.filter(item=>item.id!=id));
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const actions = useRef(['Supprimer']);// actions of the menu    


    useEffect(()=>{
        if (action==actions.current[0]) {
            deleteComment();
        }
    },[action])

    return (
        <li className={style.comment}>
            {
                photo ?
                <div className={style.comment__left}>
                    <Image
                        src={photo}
                        width={40}
                        height={40}
                    />
                </div>
                :
                <div className={style.comment__left} style={{background:color}}>
                    <p>{username[0]}</p>
                </div>
            }
            
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
                    <div className={`${style.edit_btn} menu_toggler`}>
                        <img src="/images/dots.svg" alt="" ref={edit_btn}/>
                        <Menu  
                            toggler={edit_btn} 
                            options={actions.current} 
                            setAction={setAction}
                        />
                    </div>                                            
                </div>
            }
            
        </li>
    )
}

// la zone ou on ajoute un commentaire
function AddComment({slug,setComments,sort,sorts}) {
    
    const {user} = useContext(Usercontext);
    const {setModale} = useContext(logsinModaleContext);

    const comment = useRef();
    const [commenting,setCommenting] = useState(false); // pour toggle la zone des boutons


    function publishComment(e) {
        e.preventDefault();

        if (!user) {
            setModale('login');
            return;
        }



        let commentData = {
            user: user.username,
            content:comment.current.value,
            time:new Date().getTime(),
        }

        if (user.color) commentData.color = user.color;
        else commentData.photo = user.photo;

        // ajoute le comm a la database
        addDoc(collection(db, `comments/${slug}/comments`), commentData).then((docRef)=>{
            if (sort==sorts.current[0]) // Plus ancien ==> le dernier com est en bas ==> dernier du tableau
            {
                setComments(comments=>[...comments,{...commentData,id:docRef.id}])
            }
            else// Plus récent ==> le dernier com est en haut ==> premier du tableau
            {
                setComments(comments=>[{...commentData,id:docRef.id},...comments])
            }
            
        })

        // toggle la zone de validation et clear le input
        setCommenting(false);   
        comment.current.value = '';

    }
    
    return (
        <div className={style.write_a_comments}>
            <div className={style.write_a_comments__left}>
                {
                    user?
                    (
                        user.photo ?
                        <Image
                            src={user.photo}
                            width={40}
                            height={40}
                        />
                        :
                        <div style={{background:user.color}}>
                            {user.username[0]}
                        </div>
                    )
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