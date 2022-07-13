import axios from 'axios'
import { useState } from 'react';
import styles from './buttonStyles.module.css'
export const UploadModal = ({ handleOpenModal, setModalIsOpen, handleUpdate, pid, update }) => {

    const [selectedFile, setSelectedFile] = useState()
    const [fileData, setFileData] = useState("initial")

    const onFileChange =(event) => {
      //  console.log(event.target.files[0].name);
        setSelectedFile(event.target.files[0])
      
        let reader = new FileReader();
        reader.onload = function(e) {
            console.log(e.target.result);
            setFileData({file: reader.result})
        }
        reader.readAsText(event.target.files[0])
       
    }



   async function uploadFile() {
        let file_id = Math.floor((Math.random() * 10000) + 1000)
        let newdata = {
            "file_id": file_id,
            "project_id": 54303,
            "type": "file",
            "parent": pid === 0 ? null : pid,
            "parents": null,
            "name": selectedFile.name,
            "path": "dkfkmd",
        }
       
        await axios.post("http://localhost:3001/files", newdata)
        await axios.post(`http://localhost:3001/temp/`,{"content": fileData.file} )
        handleUpdate(!update)

    }
    return <>
        <h2>Upload file</h2>
        <input type="file" accept='.py' onChange={(e) => {
            onFileChange(e)
        }}></input>
        <div style={{ display: "flex", margin: "15px 0px", justifyContent: "end" }}>
            <button style={{ marginRight: "10px" }} className={styles.cancle} onClick={() => { setModalIsOpen(false); handleOpenModal(false) }}>Cancle</button>
            <button className={styles.sucess} onClick={() => {
                handleOpenModal(false)
                setModalIsOpen(false)
                uploadFile()
            }}>Upload</button>
        </div>
    </>
}