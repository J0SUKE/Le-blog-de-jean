import React from 'react'
import Blog from '../../components/Blog/Blog'
import {fetchAPI} from '../../lib/api';

export default function Home({articles}) {
  return (
    <Blog articles={articles}/>
  )
}

export async function getStaticProps() {
  let articles = await fetchAPI('/articles',{
    populate:'*'
  });
  articles = articles.data;

  return{
    props:{
      articles
    },
    revalidate: 10, 
  }

}