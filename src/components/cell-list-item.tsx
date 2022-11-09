import './cell-list-item.css'
import { Cell } from '../state'
import CodeCell from './code-cell'
import TextEditor from './text-editor'
import ActionBar from './action-bar'
import AddCell from './add-cell'

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  // TODO: The action bar in the markdown cell cover some button.
  // TODO: Make the action bar above the markdownm cell the same as code cell.
  let child: JSX.Element
  if (cell.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    )
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    )
  }

  return <div className='cell-list-item'>{child}</div>
}

export default CellListItem
