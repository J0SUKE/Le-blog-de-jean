import styles from './Page404.module.scss';
import BlogLayout from '../BlogLayout/BlogLayout';
import Link from 'next/dist/client/link';

export default function Page404() {
  return (
    <BlogLayout>  
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.content__left}>
              <h1>Page introuvable</h1>
              <p>La page que vous cherchez n&apos;existe pas ou a été supprimée</p>
              <Link href={'/blog'}>
                <a>
                  <button>Explorer</button>
                </a>
              </Link>
              
          </div>
          <div className={styles.content__right}>
            <img src="/images/404.svg" alt="" />
          </div>
        </div>
      </div>
    </BlogLayout>    
  )
}
