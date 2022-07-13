import { useState } from "react";
import styles from './buttonStyles.module.css'
export const RenameFolderModal = ({ handleOpenModal, setModalIsOpen, renameFolder, data }) => {

    const [updatedName, setUpdatedName] = useState(data.name)
    const handleChangeForName = (e) => {
        setUpdatedName(e.target.value)
    }

    return <>
        <h2>Rename folder</h2>
        <input style={{ padding: "10px", width: "80%" }} type="text" value={updatedName} onChange={(event) => {
            handleChangeForName(event)
        }} />
        <div style={{ display: "flex", margin: "15px 0px", justifyContent: "end" }}>
            <button  className={styles.cancle} style={{ marginRight: "10px" }} onClick={() => { setModalIsOpen(false); handleOpenModal(false) }}>Cancle</button>
            <button  className={styles.sucess} onClick={() => {
                renameFolder(updatedName)
                handleOpenModal(false)
                setModalIsOpen(false)
            }}>Rename</button>
        </div>
    </>
}