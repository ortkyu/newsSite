import React from 'react'
import {useState, useEffect} from 'react'
import {MainLayout} from '../components/MainLayout'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import s from '../styles/article.module.css'
import {useForm} from "react-hook-form";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { initializeStore } from "../store";
import { GetServerSideProps } from 'next'
import { RootState } from '../store/reducers';
import {addArticle} from "../store/article/action"
import {CommentArticle} from "../store/article/types"



export default function Article () {

    const router = useRouter()

    const dispatch = useDispatch();

  const article = useSelector((state: RootState) => state.article.article )


    const [comment, setCom] = React.useState<CommentArticle>({})

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

    if (!article) {
        return <MainLayout>
            <p>...Подождите</p>
               </MainLayout>
    }

    return (
        <>
        <MainLayout>
            <Head>
                <title>Техно новости</title>
                <title>{article.title}</title>
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
                        <ReactMarkdown source={article.body} escapeHtml={false}/>
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
                    {comment.author &&
                    <div className={s.blockComment}>
                            <span>
                            {comment.author}
                                <small>
                        {comment.commentDate}
                        </small>
                                 </span>
                        <div>
                            {comment.comment}
                        </div>
                    </div>
                    }
                    {article.comments && article.comments.map(c =>
                        <div key={c._id} className={s.blockComment}>
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
        </>
    )
}


export async function getServerSideProps(router) {
    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;
  
    await dispatch(addArticle(router.query.id));
  
    return { props: { initialReduxState: reduxStore.getState() } };
  }