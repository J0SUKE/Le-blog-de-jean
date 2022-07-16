import {fetchAPI} from '../../lib/api';
import Article from '../../components/Article/Article';
import { collection, query, getDocs,orderBy } from "firebase/firestore";
import { db } from '../../Firebase/firebase-config';

export default function ArticlePage({articles,comments}) {
    
    return <Article articles={articles} comments={comments}/>
}

export async function getStaticPaths() {
    
    let paths = await fetchAPI('/articles',{
        populate:'*'
      });
    

    paths = paths.data.map((item)=>{
        return ({
            params:{
                slug:item.attributes.slug,
                id:item.id
            }
        })
    })
    
    return {
      paths,
      fallback: 'blocking'
    };
  }

export async function getStaticProps({params}) {
    let article = await fetchAPI(`/articles`,{
      populate:'*',
      filters:{
        slug:{
            $eq: params.slug
        }
      }
    });


    let allArticles = await fetchAPI(`/articles`,{
      populate:'*',
      filters: {
        slug: {
          $ne: params.slug,
        },
      },
    });

    allArticles=allArticles.data;
    article = article.data;
    
    //get the comments from Firebase
    const q = query(collection(db, `comments/${params.slug}/comments`),orderBy("time", "desc"));
    let comments = [];

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          comments.push({...doc.data(),id:doc.id});
    });


    if (allArticles.length>=2) {
      return{
        props:{
          articles:[...article,allArticles[allArticles.length-1],allArticles[allArticles.length-2]],
          comments
        },
        revalidate: 10, 
      }  
    }

    else if (allArticles.length==1) {
      return{
        props:{
          articles:[...article,allArticles[0]],
          comments
        },
        revalidate: 10,
      }  
    }

    else
    {
      return{
        props:{
          articles:[...article],
          comments
        },
        revalidate: 10,
      }  
    }

    
  
  }