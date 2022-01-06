import '../styles/globals.css'
import Layout from '../components/UI/Layout'
import { Provider } from '../context/context'

function MyApp({ Component, pageProps }) {

    return (
        <Provider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
  
}

export default MyApp
