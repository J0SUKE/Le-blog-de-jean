import '../styles/globals.scss'
import Layout from '../components/Layout/Layout'
import UserContext from '../context/UserContext'

function MyApp({ Component, pageProps }) {
  return <UserContext>
    <Layout>
        <Component {...pageProps} />
    </Layout>
  </UserContext>
  
}

export default MyApp
