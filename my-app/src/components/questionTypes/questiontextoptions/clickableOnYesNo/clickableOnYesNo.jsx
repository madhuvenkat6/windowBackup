import { useState } from "react"
import styles from "./clickableOnYesNo.module.css"
import { Pattern } from "./pattern"
export const ClickableOnYesNo = ({ data }) => {

    const [flagForOutput, setFlag] = useState(false)
    const [flagForSubmit, setFlagFS] = useState(false)

    const handleClick = (val) => {
        if (data.answer === val) {
            setFlag(true)
        } else {
            setFlag(false)
        }
        setFlagFS(true)
    }

    return <div>


        <h1>{data.questionName}</h1>
        <div style={{ display: 'flex' }}>
            {data.questionContent[0].map((e, i) => {
                return <div className={styles.frame}  ><Pattern count={data.questionContent[0][i].count} imgUrl={data.questionContent[0][i].img} /></div>
            })}
        </div>

        <button className={styles.yesNoButton} onClick={() => {
            handleClick("yes")
        }} >Yes</button>
        <button className={styles.yesNoButton} onClick={() => {
            handleClick("no")
        }}>No</button>


        {flagForSubmit ? <div>
            <div>
                <div style={{ textAlign: "left" }}>Output</div>
                {flagForOutput ? <div className={styles.outputBox} style={{ backgroundColor: "green" }}>Yes, you are correct!</div> : <div className={styles.outputBox} style={{ backgroundColor: "red" }}>Sorry, you are Incorrect!</div>}
            </div>

            <div>
                <div style={{ textAlign: "left" }}>Explanation</div>
                <div className={styles.outputBox}>correct answer is {data.answer}</div>
            </div>
        </div> : <></>}
    </div>
}