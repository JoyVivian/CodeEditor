import './action-bar.css'
import { useActions } from '../hooks/use-actions'

interface ActionBarProps {
  id: string
}

/**
 * Action bar component that used to move up, down and delete the current cell.
 *
 * @param id - The id of the current cell.
 * @returns A action bar component.
 */
const ActionBar: React.FC<ActionBarProps> = ({ id }: ActionBarProps) => {
  const { moveCell, deleteCell } = useActions()

  return (
    <div className='action-bar'>
      <button className='button is-primary is-small' onClick={() => moveCell(id, 'up')}>
        <span className='icon'>
          <i className='fas fa-arrow-up'></i>
        </span>
      </button>

      <button className='button is-primary is-small' onClick={() => moveCell(id, 'down')}>
        <span className='icon'>
          <i className='fas fa-arrow-down'></i>
        </span>
      </button>
      <button className='button is-primary is-small' onClick={() => deleteCell(id)}>
        <span className='icon'>
          <i className='fas fa-times'></i>
        </span>
      </button>
    </div>
  )
}

export default ActionBar
