import './cell-list.css'
import { useTypedSelector } from '../hooks/use-typed-selector'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'
import { Fragment, useEffect } from 'react'
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
  // Not to have a derive state stored in redux is a good practice.
  // Use selector to avoid derive state.
  // This line of code is a good example for this situation.
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id]
    })
  });

  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
