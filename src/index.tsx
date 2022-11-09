import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ReactDOM from 'react-dom/client'
import { useEffect } from 'react'
import { setup } from './bundler/index'
import { Provider } from 'react-redux'
import { store } from './state'
import CellList from './components/cell-list'

const App = () => {
  // Initialize the esbuild-wasm.
  useEffect(() => {
    setup()
  }, [])

  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
