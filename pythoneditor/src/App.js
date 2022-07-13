import './App.css';
import AceEditor from "react-ace";
import { Editor } from './components/editor';
import { useEffect, useRef, useState } from 'react';
import Pyodide from './components/pydoide';
import styles from './components/editor.module.css'
import { FileStructure } from './components/filestructure';
import { Fs } from './components/tryonlinefilestructure';
import axios from 'axios'
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')
function App() {
  const [output, setOutput] = useState('output goes here....')
  let onRun = useRef(null)
  const callOnRun = () => onRun.current();

  const handleOutput = (val) => {
    setOutput(val)
  }

  const check = () => {
    console.log(onRun.current);
  }

  const [program, setProgram] = useState("")

  const handlePythonProgram = (val) => {
    setProgram(val)
  }

  useEffect(() => {
    AceEditor.value = ""
    AceEditor.value = program
  }, [program])


  const [data1, setData1] = useState([])
  const [update, setUpdate] = useState(true)
  const [currentFileId, setCurrentFileId] = useState()

  const handleCurrentFileID = (id) => {
    setCurrentFileId(id)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/files').then((res) => {
      console.log(res.data);
      setData1([...res.data])
    })
    console.log(data1);
  }, [update])


  const [save,setSave] =useState(false)
  // test
  useEffect(() => {
    console.log("heyyyyy!",currentFileId);
    async function save() {
      if (currentFileId) {
        console.log("saving....!",currentFileId);
        await axios.patch(`http://localhost:3001/temp/${currentFileId}`, {
          content: AceEditor.value
        })
        setProgram(AceEditor.value)
        setUpdate(!update)
      }
    }

    save();
    
  }, [save])

  const handleUpdate = (val) => {
    setUpdate(val)
  }

  // axios.post("https://testserver.begalileo.com/app_students/game_levels?live_class_id=4")
  // .then((res)=>{
  //   console.log(res.data.levels);
  // })

  return (
    <div className="App">
      {/* <h1>hey!</h1> */}
      <div className={styles.editorStructure}>
        <div className={styles.file}>
          <Fs data1={data1} handleUpdate={handleUpdate} update={update} handlePythonProgram={handlePythonProgram} handleCurrentFileID={handleCurrentFileID} />
        </div>

        <div className={styles.pythoneditor}>
          <div id={styles.pythoneditorLeft}>

            <div id={styles.top}>
              <button className={styles.run} onClick={() => {
                console.log('going to save');
                console.log(AceEditor.value);
                setSave(!save)
              }}>Save</button>
            </div>
            <div id={styles.bottom}>
              <Editor program={program} />
            </div>
          </div>

          <div id={styles.gap}></div>

          <div id={styles.pythoneditorRight}>
            <div id={styles.top}>
              <div></div>
              <div>
                <button className={styles.run} onClick={callOnRun}>Run</button>
                <button className={styles.clear} onClick={() => { handleOutput("") }}>Clear</button>
              </div>
            </div>
            <div id={styles.bottom}>
              <Pyodide pythonCode={AceEditor.value} output={output} handleOutput={handleOutput} onRun={onRun} />
            </div>
          </div>
        </div>
      </div>

      {/* <Fs data1={data1} handleUpdate={handleUpdate} update={update} /> */}
    </div>

  );
}

export default App;
{/* <Fs data1={data1} handleUpdate={handleUpdate} update={update}/> */ }
{/* <FileStructure handlePythonProgram={handlePythonProgram} /> */ }