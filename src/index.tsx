import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import CodeCell from './components/code-cell';
import { setup } from './bundler/setup';
import TextEditor from './components/text-editor';

const App = () => {

  // Initialize the esbuild-wasm.
  useEffect(() => {
    setup();
  }, [])

  return (
    <div>
      <TextEditor />
      {/* <CodeCell /> */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
