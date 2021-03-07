import React from "react";
import Link from "next/link";
import { MainLayout } from "../components/MainLayout";
import Head from "next/head";
import s from "../styles/articles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { initializeStore } from "../store";
import { GetServerSideProps } from 'next'
import { RootState } from '../store/reducers';
import {addArticlesAll, addMoreArticlesAll} from "../store/articles/action"
import {useRouter} from 'next/router'


export default function Index() {
  const dispatch = useDispatch();
  const router = useRouter()

  const newsArticles = useSelector((state: RootState) => state.articles.allArticles )
  const disableButton = useSelector((state: RootState) => state.articles.disableButtonMoreLoad )


  let startId =
    newsArticles[newsArticles.length - 1] &&
    newsArticles[newsArticles.length - 1].idArticle - 1;


  async function moreArticles() {
    dispatch(addMoreArticlesAll(startId))
  }

  let [topArticles, ...allArticles] = newsArticles;

  // if (newsArticles.length < 1) {
  //   return (
  //     <MainLayout>
  //       <p>Подождите ...</p>
  //     </MainLayout>
  //   );
  // }


  return (
    <>
    <MainLayout>
      {/* <Head>
        <title>Новости из мира науки и техники</title>
        <meta
          name="description"
          content="Самые последние новости из мира науки и техники, открытия, исследования и изобретения"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(68154151, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });`,
          }}
        />
        <meta
          itemProp="image"
          content="https://img2.akspic.ru/image/29690-struktura-kosmos-tehnologia-elektronnaya_tehnika-tehnologii-1920x1080.jpg"
        />
      </Head> */}
      {/* <noscript
        dangerouslySetInnerHTML={{
          __html: ` <div><img src="https://mc.yandex.ru/watch/68154151" style="position:absolute; left:-9999px;" alt="" /></div>`,
        }}
      /> */}
      {newsArticles.length < 1 ?  
      <div>loading...</div>
      :
      <div>
        <h1 className={s.tit}>Новости</h1>
        <div>
          <div className={s.topWrapper}>
            <div className={s.articlesTop}>
            <Link
                href={`/${topArticles.idArticle}`}
            >
                <div>
                  <img src={topArticles.photo} />
                  <dl className={s.topDate}>
                    <small>{topArticles.date}</small>
                    <a>
                      <h2>{topArticles.title}</h2>
                    </a>
                  </dl>
                </div>
              </Link>
            </div>
          </div>
          {allArticles &&
            allArticles.map((article) => (
              <div key={article.idArticle} className={s.wrapper}>
                <div className={s.articles}>
                  <Link href={`/${article.idArticle}`}>
                    <div>
                      <img src={article.photo} />
                      <dl className={s.dt}>
                        <small>{article.date}</small>
                        <a>{article.title}</a>
                      </dl>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className={s.but}>
          {disableButton && <p>Статей больше нет</p>}
          <button disabled={disableButton} onClick={moreArticles}>
            Еще статьи
          </button>
        </div>
      </div>}
    </MainLayout>
    </>
  );
}


export async function getServerSideProps() {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  await dispatch(addArticlesAll());

  return { props: { initialReduxState: reduxStore.getState()}};
}