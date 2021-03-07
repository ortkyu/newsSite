import {ADD_ARTICLES_ALL, ADD_DISABLE_BUTTON} from "./types"
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from '../reducers'


export const addArticlesAll = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => 
fetch(`https://floating-ocean-73818.herokuapp.com/`)
  .then((res) => res.json())
  .then((data) =>
    dispatch({
      type: ADD_ARTICLES_ALL,
      payload: data
    })
  );


export const addMoreArticlesAll = (startId = 0): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) =>
fetch(`https://floating-ocean-73818.herokuapp.com/more${startId}`)
  .then((res) => res.json())
  .then((data) => {
    if (data.length > 0) {
    dispatch({
      type: ADD_ARTICLES_ALL,
      payload: data
    })
  } else {
    dispatch({type: ADD_DISABLE_BUTTON})
          }
  }
  );

    