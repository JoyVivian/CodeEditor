import produce from 'immer'
import { ActionType } from '../action-types'
import { Action } from '../actions'

/**
 * The props type for bundling process. */
interface BundleState {
  [key: string]: {
    /**
     * Whether or not currently bundle the cell.
     */
    loading: boolean
    /**
     * Code during bundling process.
     */
    code: string
    /**
     * Errors during bundling process.
     */
    err: string
  } | undefined;
}

/**
 * Initialize bundle state with an empty object.
 */
const initialState: BundleState = {}

const reducer = produce((state: BundleState = initialState, action: Action): BundleState => {
  switch (action.type) {
    case ActionType.BUNDLE_START: {
     state[action.payload.cellId] = {
      loading: true,
      code: '',
      err: ''
     } 
     return state;
    }  
    case ActionType.BUNDLE_COMPLETE: {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err
      }
      return state
    }
    default:
      return state
  }
}, initialState);

export default reducer
