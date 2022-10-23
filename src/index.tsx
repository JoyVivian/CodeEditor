import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import CodeCell from './components/code-cell';
import { setup } from './bundler/setup';

const App = () => {

  // Initialize the esbuild-wasm.
  useEffect(() => {
    setup();
  }, [])

  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
