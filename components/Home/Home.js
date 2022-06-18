import Header from '../Header/Header';
import styles from './Home.module.scss';
import Link from 'next/link';
import {getStrapiMedia} from '../../lib/media';

import Typewriter from 'typewriter-effect';


export default function Home({about}) {
  console.log(about);

  return (
    <>
        <>
            <div className={styles.hero}>
                <img src="/images/bg.jpg" alt="" />    
                  <blockquote>
                    <Typewriter
                        onInit={(typewriter) => {
                          typewriter.typeString('<p>“It is never too late to be what you might have been.”</p>')
                            .start();
                        }}

                        options={
                          {
                            cursor:null,
                            delay:60
                          }
                        }
                      />
                  </blockquote>
            </div>
            <section className={styles.content}>
                <div className={styles.presesntation}>
                  <div className={styles.presesntation__img}>
                    <img src={getStrapiMedia(about.attributes.image)} alt="" />
                  </div>
                  <div className={styles.presesntation__text}>
                    <h2>{about.attributes.title}</h2>
                    <p>{about.attributes.content}</p>
                    <button>
                      <Link href='/blog'>
                        <a>Explorer</a>
                      </Link>
                    </button>
                  </div>
                </div>
            </section>
        </>
    </>
    
  )
}
