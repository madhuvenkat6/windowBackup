import { useState } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios'
import { NewFolderModal } from './modals/newfolderModal';
import { NewFileModal } from './modals/newFileModal';
import { RenameFileModal } from './modals/renameFileModal';
import { RenameFolderModal } from './modals/renameFolderModal';
import { DeleteFileModal } from './modals/deleteFileModal';
import { DeleteFolderModal } from './modals/deleteFolderModal';
import { UploadModal } from './modals/uploadModal';

export const Modal = ({ type, pid, data, isOpen, handleOpenModal, handleUpdate, update }) => {
    const [modalIsOpen, setModalIsOpen] = useState(isOpen)
    const [dataInput, setDataInput] = useState("")

    const handleOnchange = (e) => {
        setDataInput(e.target.value)
    }

    async function postFileOrFolder() {
        if (type === 'file') {
            let len = dataInput.length;
            let word = dataInput.substring(len - 3)
            if ('.py' !== word) {
                alert("Error plz provide a valid extension")
            }
        }

        let newdata = {
            "file_id": Math.floor((Math.random() * 10000) + 1000),
            "project_id": 54303,
            "type": type,
            "parent": pid === 0 ? null : pid,
            "parents": null,
            "name": dataInput,
            "path": "dkfkmd",
        }

        await axios.post("http://localhost:3001/files", newdata)
        handleUpdate(!update)
    }

    async function deleteFile() {
        console.log(data);
        await axios.delete(`http://localhost:3001/files/${data.id}`)
        handleUpdate(!update)
    }

    async function deleteFolder() {
        console.log(data);
        //have to delete all childrens in folders
        await axios.delete(`http://localhost:3001/files/${data.id}`)
        handleUpdate(!update)
    }


    async function renameFile(name) {
        console.log("updated file name", name);
        let len = name.length;
        let word = name.substring(len - 3)
        if ('.py' !== word) {
            alert("Error plz provide a valid extension")
            return
        }

        await axios.patch(`http://localhost:3001/files/${data.id}`, {
            "name": name
        })
        handleUpdate(!update)
    }

    async function renameFolder(name) {
        console.log("updated folder name", name);
        await axios.patch(`http://localhost:3001/files/${data.id}`, {
            "name": name
        })
        handleUpdate(!update)
    }



    return <>
        <ReactModal isOpen={modalIsOpen} onRequestClose={() => {
            setModalIsOpen(false)
            handleOpenModal(false)
        }} style={
            {
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 101
                },
                content: {
                    height: "fit-content",
                    boxSizing: 'border-box',
                    width: "20%",
                    position: 'absolute',
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    overflow: "hidden",
                    padding: "0px 10px 0px 10px"
                }
            }
        }>
            {/* {
                type === "folder" ?
                    <h2>Add a new folder</h2>
                    : type === 'file' ?
                        <><h2>Add a new file</h2>
                            <span>supported file extension:</span>
                            <h5 style={{ margin: "3px 0 3px 0", padding: "0" }}>.py</h5></>
                        : type === 'rename' ? <><h2>Rename folder</h2></>
                            : <><h2>Are you sure Delete folder?</h2></>
            }

            <input style={{ padding: "10px", width: "80%" }} type="text" onChange={handleOnchange} />
            <div style={{ display: "flex", margin: "15px 0px", justifyContent: "end" }}>
                <button style={{ marginRight: "10px" }} onClick={() => { setModalIsOpen(false); handleOpenModal(false) }}>Cancle</button>
                <button onClick={() => {
                    console.log(dataInput, type, pid);
                    console.log('posting file/folder')
                    postFileOrFolder()
                    handleOpenModal(false)
                    setModalIsOpen(false)
                }}>Add</button>
            </div> */}
            {
                type === "folder" ?
                    <NewFolderModal handleOnchange={handleOnchange} setModalIsOpen={setModalIsOpen} postFileOrFolder={postFileOrFolder} handleOpenModal={handleOpenModal} />
                    : type === 'file' ?
                        <NewFileModal handleOnchange={handleOnchange} setModalIsOpen={setModalIsOpen} postFileOrFolder={postFileOrFolder} handleOpenModal={handleOpenModal} />
                        : type === 'renameFile' ?
                            <RenameFileModal setModalIsOpen={setModalIsOpen} handleOpenModal={handleOpenModal} handleOnchange={handleOnchange} renameFile={renameFile} data={data} />
                            : type === 'renameFolder' ?
                                <RenameFolderModal setModalIsOpen={setModalIsOpen} handleOpenModal={handleOpenModal} handleOnchange={handleOnchange} renameFolder={renameFolder} data={data} />
                                : type === 'deleteFile' ?
                                    <DeleteFileModal setModalIsOpen={setModalIsOpen} handleOpenModal={handleOpenModal} deleteFile={deleteFile} data={data} />
                                    : type === 'deleteFolder' ?
                                        <DeleteFolderModal setModalIsOpen={setModalIsOpen} handleOpenModal={handleOpenModal} deleteFolder={deleteFolder} data={data} />
                                        : type === "uploadFile" ?
                                            <UploadModal setModalIsOpen={setModalIsOpen} handleOpenModal={handleOpenModal} handleUpdate={handleUpdate} pid={pid} update={update}/>
                                            : <></>
            }
        </ReactModal>
    </>
}