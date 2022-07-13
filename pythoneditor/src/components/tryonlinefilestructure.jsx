import { useEffect, useReducer, useRef, useState } from 'react';
import styles from './tryonlinefilestructure.module.css'
import axios from 'axios'
import { Modal } from './modal';
export const Fs = ({ data1, handleUpdate, update, handlePythonProgram, handleCurrentFileID }) => {

    //let data = [{ "file_id": 85239, "project_id": 54642, "type": "folder", "parent": null, "parents": null, "name": "hey", "path": "once_in_a_blue_moon", "created_at": "2022-03-31T06:04:51.000Z", "updated_at": "2022-03-31T06:04:51.000Z" }, { "file_id": 85240, "project_id": 54642, "type": "folder", "parent": 85239, "parents": "85239", "name": "hey1", "path": "once_in_a_blue_moon/hey", "created_at": "2022-03-31T06:05:00.000Z", "updated_at": "2022-03-31T06:05:00.000Z" }, { "file_id": 85243, "project_id": 54642, "type": "folder", "parent": 85240, "parents": "85239,85240", "name": "hey11", "path": "once_in_a_blue_moon/hey/hey1", "created_at": "2022-03-31T06:05:39.000Z", "updated_at": "2022-03-31T06:05:39.000Z" }, { "file_id": 85244, "project_id": 54642, "type": "folder", "parent": 85243, "parents": "85239,85240,85243", "name": "hey111", "path": "once_in_a_blue_moon/hey/hey1/hey11", "created_at": "2022-03-31T06:05:49.000Z", "updated_at": "2022-03-31T06:05:49.000Z" }, { "file_id": 85241, "project_id": 54642, "type": "folder", "parent": 85239, "parents": "85239", "name": "hey2", "path": "once_in_a_blue_moon/hey", "created_at": "2022-03-31T06:05:10.000Z", "updated_at": "2022-03-31T06:05:10.000Z" }, { "file_id": 85242, "project_id": 54642, "type": "file", "parent": 85239, "parents": "85239", "name": "file1.py", "path": "once_in_a_blue_moon/hey", "created_at": "2022-03-31T06:05:22.000Z", "updated_at": "2022-03-31T06:05:22.000Z" }, { "file_id": 85245, "project_id": 54642, "type": "file", "parent": 85244, "parents": "85239,85240,85243,85244", "name": "hey111.py", "path": "once_in_a_blue_moon/hey/hey1/hey11/hey111", "created_at": "2022-03-31T06:06:03.000Z", "updated_at": "2022-03-31T06:06:03.000Z" }, { "file_id": 85170, "project_id": 54642, "type": "file", "parent": null, "parents": null, "name": "main.py", "path": "once_in_a_blue_moon", "created_at": "2022-03-30T04:47:16.000Z", "updated_at": "2022-03-30T05:38:14.000Z" }, { "file_id": 85176, "project_id": 54642, "type": "file", "parent": null, "parents": null, "name": "sample.py", "path": "once_in_a_blue_moon", "created_at": "2022-03-30T05:40:10.000Z", "updated_at": "2022-03-30T05:41:14.000Z" }]
    // let data = [{ "file_id": 84762, "project_id": 54273, "type": "folder", "parent": 84595, "parents": "84595", "name": "Inpypro", "path": "kk/pypro", "created_at": "2022-03-25T05:26:37.000Z", "updated_at": "2022-03-25T05:26:37.000Z" },
    // { "file_id": 84595, "project_id": 54273, "type": "folder", "parent": null, "parents": null, "name": "pypro", "path": "kk", "created_at": "2022-03-22T04:53:07.000Z", "updated_at": "2022-03-22T04:53:07.000Z" },
    // { "file_id": 84594, "project_id": 54273, "type": "file", "parent": null, "parents": null, "name": "madhu.py", "path": "kk", "created_at": "2022-03-22T04:47:34.000Z", "updated_at": "2022-03-22T04:57:28.000Z" },
    // { "file_id": 84540, "project_id": 54273, "type": "file", "parent": null, "parents": null, "name": "main.py", "path": "kk", "created_at": "2022-03-21T12:59:26.000Z", "updated_at": "2022-03-22T04:52:27.000Z" },
    // { "file_id": 84596, "project_id": 54273, "type": "file", "parent": 84595, "parents": "84595", "name": "sample.py", "path": "kk/pypro", "created_at": "2022-03-22T04:53:59.000Z", "updated_at": "2022-03-22T04:59:38.000Z" }]



    const [displayFolderMenu, setDisplayFolderMenu] = useState(false)
    const [displayFileMenu, setDisplayFileMenu] = useState(false)
    const [pid, setPid] = useState(0)

    const [positions, setPositions] = useState({ top: null, left: null })
    function postions(el) {
        console.log(el);
        let top = el.getBoundingClientRect().top
        let left = el.getBoundingClientRect().left
        setPositions({ ...positions, top: top, left: left })
        return {
            top,
            left
        }
    }
   

    // const append = (e) => {
    //     let parent = document.getElementById(e.parent)

    //     let divEle = document.createElement('div')
    //     divEle.className = styles.fileGroup
    //     divEle.id = e.file_id

    //     let divEleIn = document.createElement('div');
    //     divEleIn.className = styles.file

    //     let spanEle0 = document.createElement('i')
    //     let spanEle = document.createElement('span')
    //     let menu = document.createElement('i');
    //     menu.className = 'fa fa-ellipsis-h'
    //     menu.id = e.file_id


    //     if (e.type === 'file') {
    //         spanEle0.className = styles.extension
    //         spanEle0.innerHTML = 'py'
    //         spanEle.innerHTML = e.name
    //         menu.addEventListener('click', (event) => {
    //             event.preventDefault()
    //             event.stopPropagation();
    //             setDisplayFileMenu(true)
    //             setDisplayFolderMenu(true)
    //             if (displayFileMenu) {
    //                 setDisplayFolderMenu(false)
    //                 setDisplayFileMenu(!displayFileMenu)
    //             } else {
    //                 setDisplayFolderMenu(false)
    //                 setDisplayFileMenu(!displayFileMenu)
    //             }
    //             postions(event.target)
    //             setPid(event.target.id)
    //             setFileData(e)
    //             //handleDisplays(e);
    //             //console.log("nothing", postions(e.target));
    //         })
    //         divEleIn.addEventListener('click', (event) => {
    //             event.preventDefault()
    //             event.stopPropagation();
    //             // console.log("fetching data for file", e.name);
    //             console.log("fetching data for file", e.name, getData("1"));
    //         })

    //     } else {
    //         spanEle0.className = 'fa fa-folder'
    //         spanEle.innerHTML = e.name
    //         menu.addEventListener('click', (event) => {
    //             event.preventDefault()
    //             event.stopPropagation();
    //             setDisplayFileMenu(true)
    //             setDisplayFolderMenu(true)
    //             if (displayFolderMenu) {
    //                 setDisplayFolderMenu(!displayFolderMenu)
    //                 setDisplayFileMenu(false)
    //             } else {
    //                 setDisplayFolderMenu(!displayFolderMenu)
    //                 setDisplayFileMenu(false)
    //             }
    //             setPid(event.target.id)
    //             setFileData(e)
    //             postions(event.target)
    //             // handleDisplaysFolder(e)
    //             //console.log('id', event.target.id, postions(event.target), displayFolderMenu);
    //         })

    //         divEleIn.addEventListener('click', (event) => {
    //             event.preventDefault()
    //             event.stopPropagation();
    //             //console.log(event.currentTarget.parentNode.id);
    //             if (e.type === 'folder') {
    //                 let iEle = event.currentTarget.querySelector('i')
    //                 if (iEle.className === "fa fa-folder") {
    //                     iEle.className = "fa fa-folder-open"
    //                     addChildrensToparent(event.currentTarget.parentNode.id)
    //                 } else {
    //                     iEle.className = "fa fa-folder"
    //                     removeChildrensFromoparent(event.currentTarget.parentNode.id)
    //                 }

    //                 console.log(iEle);
    //             }
    //         })
    //     }

    //     divEleIn.appendChild(spanEle0)
    //     divEleIn.appendChild(spanEle)
    //     divEleIn.appendChild(menu)

    //     divEle.appendChild(divEleIn)
    //     parent.appendChild(divEle)

    // }


    // window.addEventListener('click',()=>{   
    //     setDisplayFileMenu(false)
    //     setDisplayFolderMenu(false)
    // })

    // const addChildrensToparent = (parentId) => {
    //     let folderElements = data1.filter((e) => e.parent == parentId ? true : false)
    //     folderElements.filter((e) => e.type === 'folder' ? true : false).map((e) => append(e))
    //     folderElements.filter((e) => e.type === 'file' ? true : false).map((e) => append(e))
    // }

    // const removeChildrensFromoparent = (parentId) => {
    //     const list = document.getElementById(parentId);
    //     while (list.childNodes.length > 1) {
    //         list.removeChild(list.children[1]);
    //     }
    // }


    const [openModal, setOpenModal] = useState(false)
    const [typeForModal, setTypeForModal] = useState("")
    const handleOpenModal = (val) => {
        setOpenModal(val)
    }


    async function getData(id) {
        let data = await axios.get(`http://localhost:3001/temp/${id}`).then((res) => res.data.content)
        console.log(JSON.stringify(data));
        handlePythonProgram(data)
        return data
    }


    const [fileData, setFileData] = useState();

    const fileComponent = (e,isdisplay) => {
        return <div key={e.file_id} id={e.file_id} className={styles.fileGroup} style={{display:isdisplay}}>
            <div className={styles.file} onClick={(event) => {
                event.preventDefault()
                console.log("fetching data for file", e.name, getData("3"));
                handleCurrentFileID("3")
            }}>
                <span className={styles.extension}>py</span>
                <span>{e.name}</span>
                <i id={e.file_id} className="fa fa-ellipsis-h" onClick={(event) => {
                    event.stopPropagation()
                    postions(event.target)
                    setPid(event.target.id)
                    if (displayFileMenu) {
                        setDisplayFolderMenu(false)
                        setDisplayFileMenu(!displayFileMenu)
                    } else {
                        setDisplayFolderMenu(false)
                        setDisplayFileMenu(!displayFileMenu)
                    }
                    setFileData(e)
                }} ></i>
            </div>
        </div>
    }


    const [ hideOrDisplayChildren , setHideOrDisplayChildren ] = useState({})

    const folderComponent = (e,isdisplay) => {
        return <div key={e.file_id} id={e.file_id} className={styles.fileGroup} style={{display:isdisplay}}>
            <div className={styles.file} onClick={(event) => {
                event.preventDefault()
                if (e.type === 'folder') {
                    let iEle = event.currentTarget.querySelector('i')
                    if (iEle.className === "fa fa-folder") {
                        iEle.className = "fa fa-folder-open"
                        let obj ={}
                        let fid = e.file_id
                        obj[fid] = true
                        setHideOrDisplayChildren({...hideOrDisplayChildren,...obj})
                        //addChildrensToparent(event.currentTarget.parentNode.id)
                    } else {
                        iEle.className = "fa fa-folder"
                        let obj ={}
                        let fid = e.file_id
                        obj[fid] = false
                        setHideOrDisplayChildren({...hideOrDisplayChildren,...obj})
                        //removeChildrensFromoparent(event.currentTarget.parentNode.id)
                    }
                }

                

            }}>
                <i className="fa fa-folder" aria-hidden="true"></i>
                <span>{e.name}</span>
                <i id={e.file_id} className="fa fa-ellipsis-h" onClick={(event) => {
                    event.stopPropagation()
                    postions(event.target)
                    setPid(event.target.id)
                    if (displayFolderMenu) {
                        setDisplayFolderMenu(!displayFolderMenu)
                        setDisplayFileMenu(false)
                    } else {
                        setDisplayFolderMenu(!displayFolderMenu)
                        setDisplayFileMenu(false)
                    }
                    setFileData(e)
                }}></i>

            </div>
           
            {
                data1.filter((f) => f.parent == e.file_id && f.type === 'folder' ? 1 : 0).map((e) => {
                    let show = "none"
                    if(hideOrDisplayChildren[e.parent]){
                        show = 'inherit'
                    }else{
                        show = "none";
                    }
                    return folderComponent(e,show)
                })
            }
            {
                data1.filter((f) => f.parent == e.file_id && f.type === 'file' ? 1 : 0).map((e) => {
                    let show = "none"
                    if(hideOrDisplayChildren[e.parent]){
                        show = 'inherit'
                    }else{
                        show = "none";
                    }
                    return fileComponent(e,show);
                })
            }

        </div>
    }

    
    return <>
        <div id={styles.sideBar} >
            <div id={styles.header} >
                <h3>Project</h3>
                <i className="fa fa-ellipsis-h" onClick={(e) => {
                    postions(e.target)
                    setDisplayFolderMenu(!displayFolderMenu)
                    setDisplayFileMenu(false)
                    setPid(0)
                    setFileData(null)
                }}></i>
            </div>

            {/* File structure which renders only for direct childs to projects*/}
            <div id={styles.fileListWrapper}>
                <div id={styles.fileList}>
                    {
                        data1.filter((e) => e.parent === null && e.type === 'folder' ? 1 : 0).map((e) => {
                            return folderComponent(e,"inherit")
                        })
                    }
                    {
                        data1.filter((e) => e.parent === null && e.type === 'file' ? 1 : 0).map((e) => {
                            return fileComponent(e,"inherit");
                        })
                    }
                </div>
            </div>

            {/*Menu Modal for folder options*/}
            <div className={styles.menuContext} style={{ display: (displayFolderMenu === false ? "none" : "flex"), position: 'absolute', left: positions.left, top: positions.top + 18 }}>
                <a href="#" onClick={() => {
                    setDisplayFolderMenu(false)
                    setOpenModal(true)
                    setTypeForModal("folder")
                }}>New Folder</a>
                <a href="#" onClick={() => {
                    setDisplayFolderMenu(false)
                    setOpenModal(true)
                    setTypeForModal("file")
                }}>New File</a>
                <a href="#" onClick={() => {
                    console.log("pid", pid)
                    setDisplayFolderMenu(false)
                    setOpenModal(true)
                    setTypeForModal("uploadFile")
                }}>Upload file</a>
                <a href="#" onClick={() => {
                    setDisplayFolderMenu(false)
                    setOpenModal(true)
                    setTypeForModal("renameFolder")
                }}>Rename</a>
                <a href="#" onClick={() => {
                    setDisplayFolderMenu(false)
                    setOpenModal(true)
                    setTypeForModal("deleteFolder")
                }}>Delete</a>
            </div>

            {/*Menu Modal for file options*/}
            <div className={styles.menuContext} style={{ display: (displayFileMenu === false ? "none" : "flex"), position: 'absolute', left: positions.left, top: positions.top + 18 }}>
                <a href="#" onClick={() => { console.log("have to fetch the respective file data and run"); }}>Run</a>
                <a href="#" onClick={() => { console.log('have to fetch the respective file data and show in editor'); }}>Edit</a>
                <a href="#" onClick={() => {
                    console.log("open a model to take the file name and update the current name", "pid", pid)
                    setDisplayFileMenu(false)
                    setOpenModal(true)
                    setTypeForModal("renameFile")
                }}>Rename</a>
                <a href="#" onClick={() => {
                    console.log("make a request and delete a respective file")
                    setDisplayFileMenu(false)
                    setOpenModal(true)
                    setTypeForModal("deleteFile")
                }}>Delete</a>
            </div>
        </div>

        {/* Modal for adding new file/folder options*/}
        {openModal ? <Modal isOpen={openModal} type={typeForModal} pid={pid} data={fileData} handleOpenModal={handleOpenModal} handleUpdate={handleUpdate} update={update} /> : <></>}

    </>
}