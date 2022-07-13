import { useState } from "react";
import styles from './buttonStyles.module.css'
export const RenameFileModal = ({ handleOpenModal, setModalIsOpen, renameFile, data }) => {

    const [updatedName, setUpdatedName] = useState(data.name)

    const handleChangeForName = (e) => {
        setUpdatedName(e.target.value)
    }
    return <>
        <>
            <h2>Rename file</h2>
            <span>supported file extension:</span>
            <h5 style={{ margin: "3px 0 3px 0", padding: "0" }}>.py</h5>
        </>
        <input style={{ padding: "10px", width: "80%" }} type="text" value={updatedName} onChange={(event) => {
            handleChangeForName(event)
        }} />
        <div style={{ display: "flex", margin: "15px 0px", justifyContent: "end" }}>
            <button  className={styles.cancle} style={{ marginRight: "10px" }} onClick={() => { setModalIsOpen(false); handleOpenModal(false) }}>Cancle</button>
            <button  className={styles.sucess} onClick={() => {
                // postFileOrFolder()
                renameFile(updatedName)
                handleOpenModal(false)
                setModalIsOpen(false)
            }}>Rename</button>
        </div>
    </>
}