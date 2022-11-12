import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells
    const orderedCells = order.map((id) => data[id])

    /**
     * If the the value tyoe is object, there are two situations.
     * Firstly, if $$type and props exist in value, this is a react component and we should render it.
     * Else, this is a plain object and we can use JSON.stringify to parse it.
     * Also, use _React and _ReactDOM to avoid name collisions.
     */
    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
    
        var show = (value) => {
          const root = document.querySelector('#root');
          
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        };
      `

    /**
     * Only show rendered result in one
     */
    const showFuncNoop = 'var show = () => {}'

    const cumulativeCode = []

    for (const c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc)
        } else {
          cumulativeCode.push(showFuncNoop)
        }
        cumulativeCode.push(c.content)
      }

      if (c.id === cellId) {
        break
      }
    }

    return cumulativeCode
  }).join('\n');
};
