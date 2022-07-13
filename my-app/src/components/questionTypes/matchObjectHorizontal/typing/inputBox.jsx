import parse from "html-react-parser"
import { useState } from "react"
export const InputBox = ({data,handleOutput,flagForSubmit}) =>{
    const [val,setVal] = useState(null)
    const handleOnChange = (e)=>{
       // console.log(e.target.value);
       setVal(e.target.value)
        handleOutput(data.col,e.target.value)
    }

    return <div>
        <div>{parse(data.imgvalue)}</div>
        <input type="text" value={val} disabled={!data.isMissed || flagForSubmit ?true:false} onChange={(e)=>{ handleOnChange(e)}} style={{height:"50px",width:"50px",textAlign:"center",margin:"5px"}}/>
    </div>
} 