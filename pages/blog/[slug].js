import {fetchAPI} from '../../lib/api';
import Article from '../../components/Article/Article';

export default function ArticlePage({articles}) {
    
    return <Article articles={articles}/>
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
      fallback: false,
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
    

    if (allArticles.length>=2) {
      return{
        props:{
          articles:[...article,allArticles[allArticles.length-1],allArticles[allArticles.length-2]]
        },
        revalidate: 10, 
      }  
    }

    else if (allArticles.length==1) {
      return{
        props:{
          articles:[...article,allArticles[0]]
        },
        revalidate: 10,
      }  
    }

    else
    {
      return{
        props:{
          articles:[...article]
        },
        revalidate: 10,
      }  
    }

    
  
  }