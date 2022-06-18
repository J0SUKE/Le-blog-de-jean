import React from 'react'
import styles from './Article.module.scss';
import rehypeRaw from "rehype-raw";
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import Link from 'next/link';
import BlogLayout from '../BlogLayout/BlogLayout';
import {getStrapiMedia}  from '../../lib/media';

export default function Article({articles}) {

  articles?.forEach((element,index) => {
    console.log(element,index);
  });
  return (  
  <BlogLayout>
      
      {/* <section className={styles.content}>
        <div className={styles.posts_link}>
          <Link href="/blog">
            <a>All posts</a>
          </Link>
        </div>
        
        <div className={styles.article}>
          <span className={styles.date}>
            <Moment format="DD MMM YYYY">
                {articles!=undefined && articles[0].attributes.createdAt}
            </Moment>
          </span>
          
          <h1>{articles!=undefined && articles[0].attributes.title}</h1>    
          <article>
            <img src={getStrapiMedia(articles[0].attributes.image)} alt="" className={styles.illustration}/>
            <ReactMarkdown skipHtml={false} rehypePlugins={[rehypeRaw]} >
              {articles!=undefined && articles[0].attributes.content}
            </ReactMarkdown>                      
          </article>
      </div>
      </section> */}
      <section className={styles.recent}>
        <ul>
          <h2>Recent posts</h2>
          <Link href="/blog">
            <a>See all</a>
          </Link>
        </ul>
        <section className={styles.other}>
          {
            articles?.length ==3 ?
              <>
                <OtherArticle article={articles && articles[1]}/>
                <OtherArticle article={articles && articles[2]}/>
              </>
            :
            articles?.length ==2 ?
            <OtherArticle article={articles && articles[1]}/>
            :
            null
          }
          
        </section>
      </section>
  </BlogLayout>
    
  )
}


function OtherArticle({article}) {
  
  return(
    <Link href={article.attributes.slug}>
      <a>
        <div className={styles.other_article}>
          <img src={getStrapiMedia(article.attributes.image)} alt="" />
          <h2>{article.attributes.title}</h2>
        </div>
      </a>
    </Link>
  )
}