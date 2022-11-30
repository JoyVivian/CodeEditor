import axios from 'axios'
import { Cell } from '../cell'
import { Dispatch } from 'redux'
import { Action } from '../actions'
import { ActionType } from '../action-types'

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS })

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells')

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data })
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
