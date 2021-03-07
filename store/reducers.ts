import { combineReducers } from 'redux'
import allArticlesReducer from  './articles/allArticlesReducer'
import articleReducer from './article/articleReducer'


 const rootReducer = combineReducers({
    articles: allArticlesReducer,
    article: articleReducer
  })


  export type RootState = ReturnType<typeof rootReducer>

  export default rootReducer
