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
  }
}

/**
 * Initialize bundle state with an empty object.
 */
const initialState: BundleState = {}

const reducer = produce((state: BundleState = initialState, action: Action): BundleState => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      return state
    case ActionType.BUNDLE_COMPLETE:
      return state
    default:
      return state
  }
})

export default reducer
