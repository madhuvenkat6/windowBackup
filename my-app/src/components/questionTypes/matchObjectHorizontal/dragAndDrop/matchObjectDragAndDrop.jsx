import parse from 'html-react-parser'
import styles from "./matchObjectDragAndDrop.module.css"
import { useState } from 'react'

export const MatchObjectsHorizontalDragAndDrop = ({ data }) => {
    const ids = []
    const [draggedStates, setDraggedStates] = useState([])
    const [flagForOutput, setFlagFO] = useState(true)
    const [flagForSubmit, setFlagFS] = useState(false)

    for (let i = 0; i < data.cols; i++) {
        ids[i] = "drag"+i;
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));

        let index = parseInt( ev.target.id ) >= 0 ? parseInt( ev.target.id ) : -1;
        if(index >= 0){
            //console.log(document.getElementById(data).innerHTML,index);
            let temp = [...draggedStates];
            let val = document.getElementById(data).innerHTML;
            temp[index] = val;
            //console.log(temp,val);
            setDraggedStates([...temp]);
            // console.log(draggedStates);
        }else{
            let reDragging = document.getElementById(data).innerHTML;
           let temp = [...draggedStates].map((e)=> e === reDragging?"":e)
           setDraggedStates([...temp])
           
        }
        
    }

    const validate = () => {
        console.log("i am in validator");
        console.log(draggedStates);
        
        if(draggedStates.length === 0 || draggedStates.length < data.cols ){
            setFlagFO(null)
                return;
        }
        for (let i = 0; i < data.cols; i++) {
            if (draggedStates[i] === "") {
                setFlagFO(null)
                return;
            }
        }

        console.log(data.questionContent[0]);
        for (let i = 0; i < data.cols; i++) {
            console.log(draggedStates[i] ,data.questionContent[0][i].numvalue);
            if (draggedStates[i] !== data.questionContent[0][i].numvalue) {
                setFlagFO(false);
                break
            }
        }

        setFlagFS(true)
    }

    return <>
        <h1>{data.questionName}</h1>
        <div style={{ display: "flex" }}>
            {data.questionContent[0].map((e, i) =>
                <span key={i} className={styles.diplayCenter}>
                    {parse(e.imgvalue)}
                    <span className={styles.eclipse} id={i} onDrop={(e) => { drop(e) }} onDragOver={(e) => { allowDrop(e) }} ></span>
                </span>)}
        </div>
        <div>
            <h3>Drag and drop the answer</h3>
            <div style={{ display: "flex", margin: "10px" }} >
                {data.questionContent[0].map((e, i) => {
                    return <div key={i} className={styles.eclipse} style={{ marginLeft: "20px" }} onDrop={(e) => { drop(e) }} onDragOver={(e) => { allowDrop(e) }}>
                        <div className={styles.dragableObject} id={ids[i]} draggable onDragStart={(e) => { drag(e) }}>
                            {data.choices[i]}
                        </div>
                    </div>
                })}

            </div>

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

        <button onClick={validate}>submit</button>
    </>
}

