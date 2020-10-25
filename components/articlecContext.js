import React, {useContext, useReducer} from 'react'



const ArticlecContext = React.createContext();

export const useArticles = () => {
    return useContext(ArticlecContext)
}

const ADD_ARTICLE = 'addArticles'

const reducer = (state, action) => {

    switch (action.type) {
        case ADD_ARTICLE: return {...state, articles: [...state.articles, ...action.newArticles]}  //...action.newArticles.reverse()
        default: return state
    }
}

export const ArticleProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {
        articles: []
    })

    const addArticles = (newArticles) => dispatch({type: ADD_ARTICLE, newArticles})

    return(
        <ArticlecContext.Provider value ={{
           articles: state.articles,
           addArticles
        }} >
            {children}
        </ArticlecContext.Provider>
    )
}