import '../styles/globals.css'
import {ArticleProvider} from "../components/articlecContext";







export default function App({ Component, pageProps }) {
    return(
        <ArticleProvider>
    <Component {...pageProps} />
        </ArticleProvider>
    )
}


