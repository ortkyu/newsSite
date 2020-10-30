import React from 'react'
import {useState, useEffect} from 'react'
import {MainLayout} from '../components/MainLayout'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import s from '../styles/article.module.css'
import {useForm} from "react-hook-form";
import Head from "next/head";



export default function Article({serverArticles}) {

    const [articles, setArticle] = useState([])
    const router = useRouter()

    let loadArticles = () => {
        fetch(`https://floating-ocean-73818.herokuapp.com/${router.query.id}`)
            .then(response => response.json())
            .then(data => setArticle(...data))
    }

    if (articles.length < 1 && serverArticles) {
        setArticle(...serverArticles)
    } else if (articles.length < 1 && !serverArticles) {
        loadArticles()
    }

    const [com, setCom] = useState({})

    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = (data) => {
        let {author} = data
        let {comment} = data
        PostComment(author, comment)
        setCom({author, comment, commentDate})
        reset()
    }

    let commentDate = new Date().toLocaleDateString()
    let idAr = router.query.id
    const PostComment = async (author, comment) => {
            await fetch(`https://floating-ocean-73818.herokuapp.com/`, {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({comment, idAr, author, commentDate})
        })
    }

    if (articles.length < 1) {
        return <MainLayout>
            <p>Подождите ...</p>
        </MainLayout>
    }

    return (
        <MainLayout>
            <Head>
                <title>Техно новости</title>
                <title>{articles.title}</title>
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
                        <input name="author" placeholder={'введите ваше имя'} type="text" ref={register({
                            required: true,
                            minLength: 2,
                            maxLength: 30
                        })}/>
                        <div>
                            <textarea name="comment" placeholder={'напишите ваш комментарий'} ref={register({
                                required: true,
                                minLength: 5
                            })}/>
                        </div>
                        <input type="submit" value="Отправить"/>
                    </form>
                    {com.author &&
                    <div className={s.blockComment}>
                            <span>
                            {com.author}
                                <small>
                        {com.commentDate}
                        </small>
                                 </span>
                        <div>
                            {com.comment}
                        </div>
                    </div>
                    }
                    {articles.comments && articles.comments.map(c =>
                        <div className={s.blockComment}>
                            <span>
                            {c.author}
                                <small>
                        {c.commentDate}
                        </small>
                                 </span>
                            <div>
                                {c.commentText}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    )
}


export async function getServerSideProps(router) {

    const response = await fetch(`https://floating-ocean-73818.herokuapp.com/${router.query.id}`)
    const serverArticles = await response.json()

    return {props: {serverArticles}}
}