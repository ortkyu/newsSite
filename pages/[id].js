import {useState, useEffect} from 'react'
import {MainLayout} from '../components/MainLayout'
import Link from 'next/link'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import s from '../styles/article.module.css'
import * as firebase from "firebase";
import {useForm} from "react-hook-form";


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
            <div className={s.container}>
                <div>
                    <div className={s.content}>
                    <hr/>
                    <ReactMarkdown source={articles.body} escapeHtml={false}/>
                    <hr/>
                    </div>
                    <span>Комментарии:</span>
                    <form onSubmit={handleSubmit(onSubmit)} className={{errors} && s.form}>
                        {errors.author && <p>"имя должно содержать от 2 до 20 символов"</p>}
                       {errors.comment &&  <p>"комментарий должен содержать не менее 5 символов"</p>}
                        <input size="28" name = "author" placeholder={'введите ваше имя'} type="text" ref={register({
                            required: true,
                            minLength: 2,
                            maxLength: 30
                        })}/>
                        <div>
                            <textarea rows="3" cols="30" name = "comment" placeholder={'напишите ваш комментарий'} ref={register({
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