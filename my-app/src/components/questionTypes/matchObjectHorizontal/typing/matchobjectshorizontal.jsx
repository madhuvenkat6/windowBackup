import parse from "html-react-parser"
import styles from './matchobjectshorizontal.module.css'
import { useState } from "react";
import { InputBox } from "./inputBox";
export const MatchObjectsHorizontal = ({ data }) => {
    //console.log(data.type);
    const [output, setOutput] = useState([])
    const [flagForOutput, setFlag] = useState(true)
    const [flagForSubmit, setFlagFS] = useState(false)
    const handleOutput = (index, val) => {
        let temp = [...output]
        temp[index] = val
        setOutput([...temp])
        // console.log(output);
    }

    const validator = () => {
        
        for (let i = 0; i < data.cols; i++) {
            if (output[i] == undefined) {
                setFlag(null)
                return;
            }
        }

        let expressions = document.getElementById("upper").children[1].innerHTML.split('&nbsp;').filter((e) => e !== " " ? 1 : 0)
        let j = 0;
        for (let i = 0; i < expressions.length; i++) {
            let exp = expressions[i].split(" ");
            if (exp[1] === '+') {
                if (Number(output[j++]) + Number(output[j++]) !== Number(output[j++])) {
                    setFlag(false)
                }
            } else if (exp[1] === 'x') {
                if (Number(output[j++]) * Number(output[j++]) != output[j++] + output[j++]) {

                    setFlag(false)
                }
            } else {
                if (Number(output[j++]) - Number(output[j++]) !== Number(output[j++])) {
                    setFlag(false)
                }
            }

            if (flagForOutput === false) {
                return;
            }
        }

        setFlagFS(true)
        setTimeout(() => { serializeResponse() }, 500)

    }

    const serializeResponse = () => {
        var element = document.getElementById('upper');
        var html = element.outerHTML;
        var ques = { html: html };
        var json = JSON.stringify(ques);
        //console.log(json);
    }

    return <div>
        <div id="upper">
            {parse(data.questionName)}
            {/* <div>{parse(data.questionName)}</div> */}
            <div style={{ display: "flex", flexDirection: "row" }}>{data.questionContent[0].map((e) => { return <InputBox key={e.col} data={e} handleOutput={handleOutput} flagForSubmit={flagForSubmit} /> })}</div>
        </div>
        {flagForOutput !== null ?
            (flagForSubmit ? <div>
                <div>
                    <div style={{ textAlign: "left" }}>Output</div>
                    {flagForOutput ? <div className={styles.outputBox} style={{ backgroundColor: "green" }}>Yes, you are correct!</div> : <div className={styles.outputBox} style={{ backgroundColor: "red" }}>Sorry, you are Incorrect!</div>}
                </div>

                <div>
                    <div style={{ textAlign: "left" }}>Explanation</div>
                    <div className={styles.outputBox}> {parse(data.solution.model[0].val)}</div>
                </div>
            </div> : <></>) :
            <div>
                <div style={{ textAlign: "left" }}>Output</div>
                <div className={styles.outputBox} style={{ backgroundColor: "orange" }}> please, fill all the boxes.</div>
            </div>}

        <button onClick={validator}>submit</button>
        {/* {parse("")} */}
    </div>
} 