import "./add-cell.css"
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
    previousCellId: string | null;
    // When there is no previous cell, using this to force add cell visible.
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
    const { insertCellAfter } = useActions();

    return <div className={`add-cell ${forceVisible && 'force-visible'}`}>
        <div className="add-buttons">
            <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, 'code')}>
                <span className="icon is-small">
                    <i className="fas fa-plus" />
                </span>
                <span>Code</span>
                </button>
            <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, 'markdown')}>
                <span className="icon is-small">
                    <i className="fas fa-plus" />
                </span>
                <span>Markdown</span>
                </button>
        </div>
        <div className='divider'></div>
    </div>
};

export default AddCell;