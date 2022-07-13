import { useEffect, useState , useRef} from 'react'
import styles from './editor.module.css'
import AceEditor from "react-ace";
import Head from 'next/head'
export default function Pyodide({ pythonCode, output, handleOutput, onRun }) {
    const indexURL = 'https://cdn.jsdelivr.net/pyodide/dev/full/'
   // const [pyodide, setpy] = useState()
    const pyodide = useRef(null)
   // const [isPyodideLoading, setIsPyodideLoading] = useState(true)
    //const [pyodideOutput, setPyodideOutput] = useState(null)

    useEffect(() => {
        (async function () {
            pyodide.current = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/dev/full/'
              })
        })()

        onRun.current = onClickRun;

        return () => {
            onRun.current = null;
        }
    },[pyodide])



    // useEffect(() => {
    //     if (!isPyodideLoading) {
    //       ;(async function () {
    //         setPyodideOutput(await pyodide.current.runPython(pythonCode))
    //       })()
    //     }
    //   }, [isPyodideLoading, pyodide, pythonCode])

    const evaluatePython = async (pythonCode) => {
        try {
            await  pyodide.current.runPython(`
                import sys
                import io
                sys.stdout = io.StringIO()
            `);
            await  pyodide.current.runPython(pythonCode)
            return await  pyodide.current.runPython("sys.stdout.getvalue()")
        } catch (error) {
            return (error)
        }
    }

    async function onClickRun() {

        let val = AceEditor.value;
        handleOutput(await evaluatePython(val))

    }


    return (
        <>
            <Head>
                <script src=
                    {'https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js'} />
            </Head>
            <textarea
                id="outputConsole"
                className={styles.pythonoutput}
                readOnly
                value={output}
                placeholder="> output goes here..."
            />
        </>
    )
}