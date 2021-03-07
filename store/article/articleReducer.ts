import {
    ADD_ARTICLE,
    ArticleState,
    ArticleActionTypes
  } from "./types";
  
  const initialState: ArticleState = {
    article: null
  };
   
  const articleReducer = (state = initialState, action: ArticleActionTypes): ArticleState => {
    switch (action.type) {
      case ADD_ARTICLE:
        return {
          ...state,
          article: action.payload
          };
  
      default:
        return state;
    }
  };
  
  export default articleReducer;