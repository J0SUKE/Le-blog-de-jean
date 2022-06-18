import styles from './Contact.module.scss';

export default function Contact() {
  return (
    <div className={styles.content_conatainer}>
        <div className={styles.content}>
            <h2>Pour me contacter</h2>
            <p>Vous pouvez me joindre via les reseaux sociaux ou me contacter directement par mail sur 
                <a href="mailto:jeanmazouni@gmail.com"> jeanmazouni@gmail.com</a>
            </p>
            <ul>
                <a href='https://twitter.com/Jean_M_____I' target='_blank' rel='noreferrer'><li><img src="/images/twitter.svg" alt="" /></li></a>
                <a href='https://github.com/J0SUKE' target='_blank' rel='noreferrer'><li><img src="/images/github.svg" alt="" /></li></a>
                <a href="mailto:jeanmazouni@gmail.com"><li><img src="/images/email.svg" alt="" /></li></a>
            </ul>
        </div>
    </div>
  )
}
