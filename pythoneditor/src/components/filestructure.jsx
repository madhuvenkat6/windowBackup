import { useState } from 'react';
import styles from './filestructure.module.css'
import axios from 'axios'
import AceEditor from "react-ace";
export const FileStructure = ({ handlePythonProgram }) => {
    const projectMenuClicked = (type) => {
        console.log("create a new file/folder by project");

        switch (type) {
            case 1:
                createFolder()
                break;
            case 2:
                createFile()
                break;
            default:
                break;
        }
    }

    const createFile = () => {
        let fileDivEle = document.createElement('div')
        fileDivEle.className = styles.pyfile

        let innerDiv = document.createElement('div');
        innerDiv.innerText = 'file.py'

        let iEle = document.createElement('i');
        iEle.className = "fa fa-ellipsis-h"
        iEle.id = styles.menuIcon
        iEle.addEventListener('click', function (e) {
            console.log("file menu");
            getParent(e)
        })

        fileDivEle.appendChild(innerDiv)
        fileDivEle.appendChild(iEle)
        document.getElementById(styles.bodySection).appendChild(fileDivEle)
    }

    const createFolder = () => {
        let folderDivEle = document.createElement('div')
        folderDivEle.className = styles.pyfolder
        folderDivEle.addEventListener('click', function () {
            console.log('Folder opened');
        })

        let innerDiv = document.createElement('h4');
        innerDiv.innerText = 'FolderD'

        let iEle = document.createElement('i');
        iEle.className = "fa fa-ellipsis-h"
        iEle.id = styles.menuIcon
        iEle.addEventListener('click', function (e) {
            console.log("folder menu");
            getParent(e)
        })

        folderDivEle.appendChild(innerDiv)
        folderDivEle.appendChild(iEle)
        document.getElementById(styles.bodySection).appendChild(folderDivEle)
    }


    const getParent = (e) => {
        console.log(e);
    }

    const [isFolderOpen, setFolderState] = useState(false)
    const folderOpenClose = () => {
        console.log('Folder opened')
        if (isFolderOpen) {
            document.getElementById('folder').className = "fa fa-folder"
        } else {
            document.getElementById('folder').className = "fa fa-folder-open"
        }
        setFolderState(!isFolderOpen)
    }

    const [dummyState,setDummy] = useState(true)
    async function getData(id){
      let data =  await axios.get(`http://localhost:3001/files/${id}`).then((res)=>res.data.content)
      console.log(JSON.stringify(data));
      handlePythonProgram(data)
    }


    return <div className={styles.main}>

        <div id={styles.headSection}>
            <h3>Project</h3>
            <i id={styles.menuIcon} className="fa fa-ellipsis-h" onClick={() => { projectMenuClicked(2) }}></i>
        </div>

        <div id={styles.bodySection}>

            <div className={styles.pyfile} onClick={()=>{getData(1)}}>
                <div>main.py</div>
                <i id={styles.menuIcon} className="fa fa-ellipsis-h" onClick={(e) => {
                    console.log("file menu");
                    getParent(e)
                }}></i>
            </div>

            <div className={styles.pyfile} onClick={()=>{getData(2)}}>
                <div>sample.py</div>
                <i id={styles.menuIcon} className="fa fa-ellipsis-h" onClick={(e) => {
                    console.log("file menu");
                    getParent(e)
                }}></i>
            </div>


            <div className={styles.pyOutterfolder}>
                <div className={styles.pyInnerFolder}  onClick={folderOpenClose} >
                    <i data-feild-id='file-id-2' className="fa fa-folder" aria-hidden="true"></i>
                    <span >Folder Name</span>
                    <i id={styles.menuIcon} className="fa fa-ellipsis-h" onClick={(e) => {
                        console.log("folder menu");
                        getParent(e)
                    }}></i>
                </div>

            </div>


        </div>
    </div>
}