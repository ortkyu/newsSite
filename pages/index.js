import Link from 'next/link'
import {MainLayout} from '../components/MainLayout'
import {useState} from "react";
import Head from "next/head";
import s from "../styles/articles.module.css";
import {useArticles} from "../components/articlecContext";


export default function Index({serverArticles}) {
    const {articles, addArticles} = useArticles()

    let loadArticles = () => {
        fetch('https://floating-ocean-73818.herokuapp.com/')
            .then(response => response.json())
            .then(data => addArticles(Object.values(data)))
    }

    if (articles.length < 1 && serverArticles) {
        addArticles(Object.values(serverArticles))
    } else if (articles.length < 1 && !serverArticles) {
        loadArticles()
    }
    let startId = articles[articles.length - 1] && articles[articles.length - 1].idArticle - 1


    const [disableButton, setDisable] = useState(false)

    async function moreArticles() {
        fetch(`https://floating-ocean-73818.herokuapp.com/more${startId}`)
            .then(response => response.json())
            .then(articlesData => {
                if (articlesData.length > 0) {
                    addArticles(articlesData)
                } else {
                    setDisable(true)
                }
            })
    }


   let [topArticles, ...allArticles] = articles

    if (articles.length<1) {
        return <MainLayout>
                  <p>Подождите ...</p>
               </MainLayout>
    }
  return (
      <MainLayout>
          <Head>
              <title>Техно новости</title>
              <title>Новости из мира науки и техники</title>
              <meta name="description" content="Самые последние новости из мира науки и техники, открытия, исследования и изобретения" />
               <script
                   dangerouslySetInnerHTML={{__html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(68154151, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });`}} />
          </Head>
          <noscript dangerouslySetInnerHTML={{__html: ` <div><img src="https://mc.yandex.ru/watch/68154151" style="position:absolute; left:-9999px;" alt="" /></div>`}}/>
          <div>
          <h1 className={s.tit}>Новости</h1>
              <articles>
                  <div className={s.topWrapper}>
                      <div className={s.articlesTop}>
                          <Link href={`/[id]`} as={`/${topArticles.idArticle}`}>
                              <div>
                                  <img src={topArticles.photo}/>
                                  <dl className={s.topDate}>
                                    <small>{topArticles.date}</small>
                                    <a><h2>{topArticles.title}</h2></a>
                                  </dl>
                              </div>
                          </Link>
                      </div>
                  </div>
                  {allArticles && allArticles.map(article =>
                      <div className={s.wrapper}>
                          <div className={s.articles}>
                              <Link href={`/[id]`} as={`/${article.idArticle}`}>
                                  <div>
                                      <img src={article.photo}/>
                                      <dl className={s.dt}>
                                          <small>{article.date}</small>
                                          <a>{article.title}</a>
                                      </dl>
                                  </div>
                              </Link>
                          </div>
                      </div>
                  )}
              </articles>
          <div className={s.but}>
              <button  disabled={disableButton} onClick={moreArticles}>Еще статьи</button>
              {disableButton && <p>Статей больше нет</p> }
          </div>
          </div>
      </MainLayout>
  )
}


export async function getServerSideProps() {
    const response = await fetch(`https://floating-ocean-73818.herokuapp.com/`)
    const serverArticles = await response.json()

    return {props: {serverArticles}}
}

