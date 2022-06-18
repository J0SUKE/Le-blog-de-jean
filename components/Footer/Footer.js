import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer_container}>
        <div className={styles.footer}>
            <div className={styles.footer__logo}>
                <img src="/images/brackets-curly.svg" alt="" />
            </div>
            <div className={styles.footer__links}>
                <ul>
                    <li><a href='https://jeanmazouni.com/' target='_blank' rel='noreferrer'>My portfolio</a></li>
                    <li><Link href='/blog'><a>Blog</a></Link></li>
                    <li><Link href='/contact'><a>Contact</a></Link></li>
                    <li><a href='https://twitter.com/Jean_M_____I' target='_blank' rel='noreferrer'>Twitter</a></li>
                    <li><a href='https://github.com/J0SUKE' target='_blank' rel='noreferrer'>Github</a></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}
