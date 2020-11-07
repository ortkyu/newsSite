import {CommentArticle} from "./commentArticle";

export interface ArticlePage {
    title: string
    _id: string
    idArticle?: number
    body: string
    comments?: CommentArticle[]
}