import Link from 'next/link'
import {MainLayout} from '../components/MainLayout'
import {useEffect, useState} from "react";
import Head from "next/head";
import s from "../styles/articles.module.css";
import *as firebase from "firebase";
import {useArticles} from "../components/articlecContext";
import {loader} from "next/dist/build/webpack/config/helpers";



const config = {
        apiKey: "AIzaSyDOqR7wKjUdqKs25dNO9NkTmhAxfbTKAGg",
        authDomain: "newsarticles-1ce5d.firebaseapp.com",
        databaseURL: "https://newsarticles-1ce5d.firebaseio.com",
        projectId: "newsarticles-1ce5d",
        storageBucket: "newsarticles-1ce5d.appspot.com",
        messagingSenderId: "508455689534",
        appId: "1:508455689534:web:64cc76ab48654ddea7e06f"
}
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}




export default function Index ({serverArticles}) {
    const {articles} = useArticles()
    const {addArticles} = useArticles()


    let loadArticles = () => {
        fetch('https://newsarticles-1ce5d.firebaseio.com/articles.json?orderBy="$key"&limitToFirst=3')
            .then(response => response.json())
            .then(data => addArticles(Object.values(data)))
    }

    if (articles.length<1 && serverArticles) {
        addArticles(serverArticles)
    } else if (articles.length<1 && !serverArticles) {
        loadArticles()
    }

    let startId = articles[articles.length - 1] && articles[articles.length - 1].id + 1

    const [disableButton, setDisable] = useState(false)

    async function moreArticles() {
        let articleRef = await firebase.database().ref('articles').orderByChild('id').startAt(startId).limitToFirst(3)
        articleRef.on('value' ,async function f(snapshot)  {
            if (snapshot.val()) {
            let newArticles = await Object.values(snapshot.val())
                addArticles(newArticles)
            } else {
               setDisable(true)
            }
        })
    }

    if (articles.length<1) {
        return <MainLayout>
            <p>Подождите ...</p>
        </MainLayout>
    }
  return (
      <MainLayout>
          <Head>
              <title>Новости</title>
          </Head>
          <h1>Новости</h1>
          <articles>
              {articles && articles.map(article =>
                  <div className={s.articles}>
                      <Link href={`/[id]`} as={`/${article.id}`}>
                          <div>
                              <img src={article.photo}/>
                              <a>{article.title}</a>
                          </div>
                      </Link>
                  </div>
              )}
          </articles>
          <div className={s.but}>
              <button  disabled={disableButton} onClick={moreArticles}>Еще статьи</button>
              {disableButton && <h1>Статей больше нет</h1> }
          </div>
      </MainLayout>
  )
}


export async function getServerSideProps() {
    const response = await fetch(`https://newsarticles-1ce5d.firebaseio.com/articles.json?orderBy="$key"&limitToFirst=3`)
    const serverArticles = await response.json()

    return {props: {serverArticles}}
}

