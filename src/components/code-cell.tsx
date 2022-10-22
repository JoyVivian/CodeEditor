import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import { setup } from '../bundler/setup';
import { bundle } from '../bundler/bundler';

const CodeCell = () => {
 
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  
  // TODO: Remove the cannot initialize() more once error message away.
  // Initialize the esbuild-wasm only once.
  useEffect(() => {
    setup();
  }, [])

  const onClick = async () => {
    // Bundle the input code and get the result.
    const result = await bundle(input);
    setCode(result);
  };

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
      <Preview code={code}/>
    </div>
  );
};

export default CodeCell;
