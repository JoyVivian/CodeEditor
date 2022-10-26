import './resizable.css';
import { useEffect, useState } from 'react';

import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
    children?: React.ReactNode;
}

const Resizeable: React.FC<ResizableProps> = ({
    direction,
    children
}) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, SetInnerHeight] = useState(window.innerHeight);
    const [innerWidth, SetInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            
            timer = setTimeout(() => {
                SetInnerHeight(window.innerHeight);
                SetInnerWidth(window.innerWidth);
            }, 100);
        }
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            height: Infinity,
            width: innerWidth * 0.75,
            resizeHandles: ['e'],
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
        };
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 24],
        };

    };

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizeable;