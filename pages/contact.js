import Contact from "../components/Contact/Contact"
import BlogLayout from '../components/BlogLayout/BlogLayout';

export default function ContactPage({social_medias}) {

  return (
    <BlogLayout>
        <Contact social_medias={social_medias}/>
    </BlogLayout>
  )
}

export async function getStaticProps(params) {
  let social_medias = await fetch(`${process.env.NEXT_PUBLIC_SOCIAL_MEDIAS}/api/social-medias`);
  social_medias = await social_medias.json();

  social_medias = social_medias.data;

  social_medias = social_medias.map(({attributes})=>{
    return (
      {
        name : attributes.name,
        link : attributes.link
      }
    )
    })
  let social_mediasObj = {}
  social_medias.forEach(element => {
    social_mediasObj[element.name] = element.link
  });

  social_medias = social_mediasObj;


  return {
    props:{
      social_medias
    }
  }
}