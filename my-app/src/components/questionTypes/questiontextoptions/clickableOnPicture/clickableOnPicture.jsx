import { Pattern } from "./pattern"
import styles from "./clickableOnPicture.module.css"
import parse from "html-react-parser"
import { useState } from "react"

export const ClickableOnPic = ({ data }) => {
    const[states,setStates] = useState([1,0])
    const [index,setIndex] = useState(0)
    const [flagForOutput, setFlag] = useState(false)
    const [flagForSubmit, setFlagFS] = useState(false)
    
    const handleClick = (index) =>{
        let temp = [...states];
        for(let i=0;i<data.questionContent[0].length;i++){
            if(index === i){
                temp[i] = 1;
                setIndex(index)
            }else{
                temp[i] = 0;
            }
        }   
        setStates([...temp])
    }

    const checkAnswer = () =>{
        if(data.questionContent[0][index].count == 6){
           setFlag(true)
        }
        console.log(data.questionContent[0][index].count);
        setFlagFS(true)
    }

    return <div>
        <h1>{data.questionName}</h1>
        <div style={{display:'flex'}}>
            {data.questionContent[0].map((e, i) => {
                return <div className={styles.frame}style={{background:states[i] == 1 ?"blue":"white"}}  onClick={()=>{handleClick(i)}} ><Pattern count={data.questionContent[0][i].count} imgUrl={data.questionContent[0][i].value} /></div>
            })}
        </div>
        {/* <Pattern count={data.questionContent[0][0].count} imgUrl={data.questionContent[0][0].value}/>
        <Pattern count={data.questionContent[0][1].count} imgUrl={data.questionContent[0][1].value}/> */}
         {flagForSubmit ? <div>
                <div>
                    <div style={{ textAlign: "left" }}>Output</div>
                    {flagForOutput ? <div className={styles.outputBox} style={{ backgroundColor: "green" }}>Yes, you are correct!</div> : <div className={styles.outputBox} style={{ backgroundColor: "red" }}>Sorry, you are Incorrect!</div>}
                </div>

                <div>
                    <div style={{ textAlign: "left" }}>Explanation</div>
                    <div className={styles.outputBox}>There are 6 camels</div>
                </div>
            </div> : <></>}
        <button onClick={()=>{checkAnswer()}} disabled={flagForSubmit === true ?true:false}>Submit</button>
    </div>
}