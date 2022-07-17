import '../styles/globals.scss'
import Layout from '../components/Layout/Layout'
import UserContext from '../context/UserContext'
import LogModaleContext from '../context/LogModaleContext'

function MyApp({ Component, pageProps }) {
  return <UserContext>
          <LogModaleContext>
            <Layout>
                <Component {...pageProps} />
            </Layout>
          </LogModaleContext>
        </UserContext>
  
}

export default MyApp
