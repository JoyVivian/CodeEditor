import "./text-editor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

// TODO: There exists a bug when remove all the content of the editor. 
const TextEditor: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState("write down some thoughts about the code.");
    const [editing, setEditing] = useState(false);
    
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            }
        
            setEditing(false);
        };
        document.addEventListener('click', listener, { capture: true });
        return () => {
            document.removeEventListener('click', listener, {capture: true});
        };
    }, []);

    if (editing) {
        return <div className="text-editor" ref={ref} data-color-mode="dark">
            <MDEditor value={value} onChange={(value = "") => {
                setValue(value);
            }} />
        </div>
    } else {
        return (
            <div className="text-editor" onClick={() => {setEditing(true);}} data-color-mode="dark">
                <MDEditor.Markdown source={value} />
            </div>
        );
    }

};

export default TextEditor;
