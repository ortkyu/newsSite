import {
    ADD_ARTICLES_ALL,
    ADD_DISABLE_BUTTON, 
    ArticlesState,
    ArticlesActionTypes
  } from "./types";
  
  const initialState: ArticlesState = {
    allArticles: [],
    disableButtonMoreLoad: false
  };
  
  const allArticlesReducer = (state = initialState, action: ArticlesActionTypes): ArticlesState => {
    switch (action.type) {
      case ADD_ARTICLES_ALL:
        return {          
          ...state,
           allArticles: [...state.allArticles, ...action.payload]
          };
          case ADD_DISABLE_BUTTON:
            return {
              ...state,
              disableButtonMoreLoad: true
            };
      default:
        return state;
    }
  };
  
  export default allArticlesReducer;