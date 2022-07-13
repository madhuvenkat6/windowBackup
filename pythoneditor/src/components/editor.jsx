import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-solarized_dark"; 
import styles from './editor.module.css'
export const Editor = ({program}) => {
   
    const handleChange = (val) =>{
        AceEditor.value = val;
        console.log(AceEditor.value);
    }
    return<AceEditor
    height="100%"
    width="inherit"
    placeholder="Enter code here!"
    mode="python"
    theme="solarized_dark"
    onChange={handleChange}
    value={program}
    fontSize={14}
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={true}
    setOptions={{
    // enableBasicAutocomplete: true,
    // enableLiveAutocompletion: false,
    // enableSnippets: false,
    showLineNumbers: true,
   // tabSize: 2,
    }}/>
}