import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizeable from './resizable'
import './resizable.css'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'
import { useTypedSelector } from '../hooks/use-typed-selector'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }: CodeCellProps) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
        createBundle(cell.id, cell.content);
    }, 750)

    return () => {
      clearTimeout(timer)
    }
  
  }, [cell.content, cell.id, createBundle])

  return (
    <Resizeable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizeable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizeable>
        {
          !bundle || bundle.loading 
          ? (<div>Loading...</div>)
          : (<Preview code={bundle.code} err={bundle.err} />)
        }
      </div>
    </Resizeable>
  )
}

export default CodeCell
