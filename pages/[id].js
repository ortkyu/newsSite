import {useState, useEffect} from 'react'
import {MainLayout} from '../components/MainLayout'
import Link from 'next/link'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import s from '../styles/article.module.css'
import * as firebase from "firebase";


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


    const handleSubmit = (event) => {
        alert(comment);
        PostComment(comment)
        event.preventDefault();
    }

    const [comment, setComment] = useState([])
    const [nameComment, setName] = useState([])
    let commentDate = new Date().toLocaleDateString()
    const PostComment = async (comment) => {
        /*let response = await fetch(`https://newsarticles-1ce5d.firebaseio.com/articles/${router.query.id}/comments.json`, {
            method: 'POST',
            body: JSON.stringify({comment})
        })
        let result = await response.text();
        alert(result);*/

        let ref = firebase.database().ref(`articles/${router.query.id}/comments`)
        ref.push({comment, nameComment, commentDate});
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
            <div className={s.container}>
                <div>
                    <hr/>
                    <ReactMarkdown source={articles.body} escapeHtml={false}/>
                    <hr/>
                    <span>Комментарии:</span>
                    <form onSubmit={handleSubmit}>
                        <input placeholder={'введите ваше имя'} type="text" onChange={e => setName(e.target.value)}/>
                        <div>
                            <textarea placeholder={'напишите ваш комментарий'} onChange={e => setComment(e.target.value)}/>
                        </div>
                            <input type="submit" value="Отправить"/>
                    </form>
                    {commentText && commentText.map(c =>
                        <>
                            <span>
                            {c.nameComment}
                        <small>
                        {c.commentDate}
                        </small>
                                 </span>
                            <div>
                                {c.comment}
                            </div>
                        </>
                        )}
                </div>
            </div>
        </MainLayout>
    )
}


export async function getServerSideProps() {

    const response = await fetch(`https://newsarticles-1ce5d.firebaseio.com/articles.json?orderBy="$key"&limitToFirst=3`)
    const serverArticles = await response.json()

    return {props: {serverArticles}}
}