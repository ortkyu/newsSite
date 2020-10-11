import {useState, useEffect} from 'react'
import {MainLayout} from '../components/MainLayout'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import s from '../styles/article.module.css'
import * as firebase from "firebase";
import {useForm} from "react-hook-form";
import Head from "next/head";


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

export default function Article() {

    const [articles, setArticle] = useState([])
    const router = useRouter()

    useEffect(() => {
        /*  fetch(`https://newsarticles-1ce5d.firebaseio.com/articles/${router.query.id}.json`)
              .then(response => response.json())
              .then(data => setArticle(data))*/

        let ref = firebase.database().ref(`articles/${router.query.id}`)
        ref.on("value", function (snapshot) {
            setArticle(snapshot.val());
        });
    }, [router.query.id])

    const { register, handleSubmit,  errors } = useForm();
    const onSubmit = (data) => {
        let {author} = data
        let {comment} = data
        PostComment(author, comment)
    }

    let commentDate = new Date().toLocaleDateString()
    const PostComment = async (author, comment) => {

        let ref = firebase.database().ref(`articles/${router.query.id}/comments`)
        ref.push({author, comment, commentDate});
    }

    let commentText = articles && articles.comments && Object.entries(articles.comments).map(c => c[1])
debugger

    if (!articles) {
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
            <div className={s.container}>
                <div>
                    <article className={s.content}>
                    <hr/>
                    <ReactMarkdown source={articles.body} escapeHtml={false}/>
                    <hr/>
                    </article>
                    <span>Комментарии:</span>
                    <form onSubmit={handleSubmit(onSubmit)} className={{errors} && s.form}>
                        {errors.author && <p>"Введите корректные имя и текст"</p>}
                        <input  name = "author" placeholder={'введите ваше имя'} type="text" ref={register({
                            required: true,
                            minLength: 2,
                            maxLength: 30
                        })}/>
                        <div>
                            <textarea  name = "comment" placeholder={'напишите ваш комментарий'} ref={register({
                                required: true,
                                minLength: 5
                            })}/>
                        </div>
                            <input  type="submit" value="Отправить"/>
                    </form>
                    {commentText && commentText.map(c =>
                        <div className={s.blockComment}>
                            <span>
                            {c.author}
                        <small>
                        {c.commentDate}
                        </small>
                                 </span>
                            <div>
                                {c.comment}
                            </div>
                        </div>
                        )}
                </div>
            </div>
        </MainLayout>
    )
}


export async function getServerSideProps() {

    const response = await fetch(`https://newsarticles-1ce5d.firebaseio.com/articles.json?orderBy="$key"&limitToLast=3`)
    const serverArticles = await response.json()

    return {props: {serverArticles}}
}