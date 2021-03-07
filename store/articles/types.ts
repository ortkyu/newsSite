export const ADD_ARTICLES_ALL = 'ADD_ARTICLES_ALL';
export const ADD_DISABLE_BUTTON = 'ADD_DISABLE_BUTTON';


export interface Article  {
    _id: string
    idArticle: number
    title: string
    date: string
    photo: string
}

  export interface ArticlesState {
    allArticles: Article[]
    disableButtonMoreLoad: boolean
  };

  
  interface AddArticlesAll {
    type: typeof ADD_ARTICLES_ALL
    payload: Article[]
  }

  interface AddDisableButton {
    type: typeof ADD_DISABLE_BUTTON
  }

  
  
 
  export type ArticlesActionTypes = AddArticlesAll  | AddDisableButton