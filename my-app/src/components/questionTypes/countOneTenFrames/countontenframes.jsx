import { useState } from "react";
import parse from "html-react-parser"
import styles from "./countonetenframes.module.css"
export const CountOnTenFrames = ({data}) => {
    const choices = [...data.choices]
    let answerCount = parseInt(data.answerCount)
    const [option,setOption] = useState(null)
    const [index,setIndex] = useState(null);
    const [color,setColor] = useState(["white","white","white","white"])
    const [output,setOutput] = useState(null)
    const [flag,setFlag] = useState(null)
    
    const handleClick = (index)=>{

        let temp = [];
        for(let i=0;i<4;i++){
            if(index == i){
                temp[i] = "green"
            }else{
                temp[i] = "white"
            }
        }
        setColor([...temp])
        setIndex(index)
        console.log(index,choices[index]);
    }
    const checkAnswer = () => {
        if(index === null){
            //console.log("please select one of the option");
            alert("please select one of the option")
            return;
        }
        if(answerCount == choices[index]){
            setOutput(data.solution.model[0].val)
            setFlag(true)
        }else{
            setOutput("Oh sorry!, you are wrong")
            setFlag(false)
        }
    }

   
    let imgs = [];
    for(let i=0;i<10;i++){
        if(i<answerCount){
            imgs[i] = 1;
        }else{
            imgs[i] = 0;
        }
    }
    return <div className={styles.mainFrame}>
        <div>
            <h3>{data.questionName}</h3>
            <table>
                <tbody>
                <tr>
                    <td>
                        {imgs[0] === 1 ? parse(data.questionContent) : <></>}
                    </td>
                    <td>
                        {imgs[1] === 1 ? parse(data.questionContent)  : <></>}
                    </td>
                    <td>
                        {imgs[2] === 1 ? parse(data.questionContent) : <></>}
                    </td>
                    <td>
                        {imgs[3] === 1? parse(data.questionContent)  : <></>}
                    </td>
                    <td>
                        {imgs[4] === 1 ? parse(data.questionContent)  : <></>}
                    </td>
                </tr>
                <tr>
                    <td>
                        {imgs[5] === 1 ?  parse(data.questionContent)  : <></>}
                    </td>
                    <td>
                        {imgs[6] === 1 ?  parse(data.questionContent)  : <></>}
                    </td>
                    <td>
                        {imgs[7] === 1?  parse(data.questionContent)  : <></>}
                    </td>
                    <td>
                        {imgs[8] === 1 ? parse(data.questionContent)  : <></>}
                    </td>
                    <td>
                        {imgs[9] === 1 ?  parse(data.questionContent) : <></>}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div className={styles.choices}>
            <div className={styles.choiceBox}><button style={{backgroundColor:color[0]}} className={styles.button} onClick={()=>{handleClick(0)}}>A</button>{choices[0]}</div>
            <div className={styles.choiceBox}><button style={{backgroundColor:color[1]}} className={styles.button} onClick={()=>{handleClick(1)}}>B</button>{choices[1]}</div>
            <div className={styles.choiceBox}><button style={{backgroundColor:color[2]}} className={styles.button} onClick={()=>{handleClick(2)}}>C</button>{choices[2]}</div>
            <div className={styles.choiceBox}><button style={{backgroundColor:color[3]}} className={styles.button} onClick={()=>{handleClick(3)}}>D</button>{choices[3]}</div>
        </div>
       {output !== null ? <div className={styles.outputBox} style={{backgroundColor:(flag?"green":"red")}} > {output} </div> : <></> } 
        <div>
            <button onClick={checkAnswer}>Submit</button>
        </div>
    </div>
}