import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './components/code-editor';


const App = () => {
  const iframe = useRef<any>();
  const [input, setInput] = useState('');

  const startService = async () => {
    try{
      await esbuild.initialize({
        worker: true,
        wasmURL: '/esbuild.wasm',
      });
    } catch (e) { console.log(e); }      
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {

    iframe.current.srcdoc = html;

    const result = await esbuild.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    });

    iframe.current.contentWindow.postMessage(result.code, '*');
  };

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try{
            eval(event.data);
          } catch (err){
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              throw err;
          }
      }, false);
      </script>
    </body>
  </html>
  `;

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
