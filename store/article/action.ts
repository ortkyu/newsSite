import { ADD_ARTICLE } from "./types"
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from '../reducers'


export const addArticle = (id=0): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) =>
  fetch(`https://floating-ocean-73818.herokuapp.com/${id}`)
            .then(response => response.json())
            .then(data => {
    dispatch({
      type: ADD_ARTICLE,
      payload: data[0],
    })}
  );
