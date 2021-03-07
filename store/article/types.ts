export const ADD_ARTICLE = 'ADD_ARTICLE';



export interface CommentArticle {
    author?: string
    commentDate?: string
    commentText?: string
    comment?: string
}

export interface ArticlePage {
    title: string
    _id: string
    idArticle?: number
    body: string
    comments?: CommentArticle[]
}


export interface ArticleState {
    article: ArticlePage | null
  };

interface AddArticle {
    type: typeof ADD_ARTICLE
    payload: ArticlePage
  }


  export type ArticleActionTypes = AddArticle 