import './text-editor.css'
import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'

interface TextEditorProps {
  cell: Cell
}

// TODO: There exists a bug when remove all the content of the editor.
const TextEditor: React.FC<TextEditorProps> = ({ cell }: TextEditorProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = useState(false)
  const { updateCell } = useActions()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return
      }

      setEditing(false)
    }
    document.addEventListener('click', listener, { capture: true })
    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div className='text-editor' ref={ref} data-color-mode='dark'>
        <MDEditor
          value={cell.content}
          onChange={(value = '') => {
            updateCell(cell.id, value || '')
          }}
        />
      </div>
    )
  } else {
    return (
      <div
        className='text-editor'
        onClick={() => {
          setEditing(true)
        }}
        data-color-mode='dark'
      >
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    )
  }
}

export default TextEditor
