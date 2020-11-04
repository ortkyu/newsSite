import {CommentArticle} from "./commentArticle";

export interface ArticlePage {
    _id: string,
    idArticle?: number,
    body: string,
    comments: CommentArticle[]
}