
import React, {useContext, useReducer} from 'react'
import {Articles} from "../interfaces/articles";

interface UseArticles {
    addArticles:(newArticles: Articles[] )=> void
    newsArticles: Articles[]
}


const ArticlesContext = React.createContext<UseArticles | undefined>(undefined);

export const useArticles = () => {
    return useContext(ArticlesContext)
}

enum ActionType {
    ADD_ARTICLE = 'addArticles'
}


export interface IAction {
    type: ActionType;
    add: {
        newArticles: Articles[];
    }
}

interface IState {
    articles: Articles[]
}


let initialState: IState;

const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.ADD_ARTICLE:
            return {...state, articles: [...state.articles, ...action.add.newArticles]};
        default:
            return state
    }
}

export const ArticleProvider = ({children}) => {
    const [state, dispatch] = React.useReducer<React.Reducer<IState, IAction>>(reducer, {articles:[]})

    const addArticles = (newArticles: Articles[]) => dispatch({type: ActionType.ADD_ARTICLE, add:{newArticles}})

    return(
        <ArticlesContext.Provider value = {{
        newsArticles: state.articles,
            addArticles
    }} >
    {children}
    </ArticlesContext.Provider>
)
}

