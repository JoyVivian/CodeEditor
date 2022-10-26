import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import { bundle } from '../bundler/bundler';
import Resizeable from './resizable';
import './resizable.css';

const CodeCell = () => {

  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // TODO: Figure out a better way to initialize esbuild only once.
  const onClick = async () => {
    // Bundle the input code and get the result.
    const result = await bundle(input);
    setCode(result);
  };

  return (
    <Resizeable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizeable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizeable>
        <Preview code={code} />
      </div>
    </Resizeable>
  );
};

export default CodeCell;
