import styles from './Contact.module.scss';

export default function Contact({social_medias}) {
  return (
    <div className={styles.content_conatainer}>
        <div className={styles.content}>
            <h2>Pour me contacter</h2>
            <p>Vous pouvez me joindre via les reseaux sociaux ou me contacter directement par mail sur 
                <a href={`mailto:${social_medias.email}`}> {social_medias.email}</a>
            </p>
            <ul>
                <a href={social_medias.twitter} target='_blank' rel='noreferrer'><li><img src="/images/twitter.svg" alt="" /></li></a>
                <a href={social_medias.github} target='_blank' rel='noreferrer'><li><img src="/images/github.svg" alt="" /></li></a>
                <a href={`mailto:${social_medias.email}`}><li><img src="/images/email.svg" alt="" /></li></a>
            </ul>
        </div>
    </div>
  )
}
