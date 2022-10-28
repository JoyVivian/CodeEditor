import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import { bundle } from '../bundler/index';
import Resizeable from './resizable';
import './resizable.css';

const CodeCell = () => {

  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };

  }, [input]); 

  return (
    <Resizeable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizeable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizeable>
        <Preview code={code} err={err}/>
      </div>
    </Resizeable>
  );
};

export default CodeCell;
