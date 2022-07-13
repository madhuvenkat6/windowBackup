import styles from './buttonStyles.module.css'
export const NewFileModal = ({ handleOnchange, setModalIsOpen, postFileOrFolder, handleOpenModal }) => {
    return <>
        <>
            <h2>Add a new file</h2>
            <span>supported file extension:</span>
            <h5 style={{ margin: "3px 0 3px 0", padding: "0" }}>.py</h5>
        </>
        <input style={{ padding: "10px", width: "80%" }} type="text" onChange={handleOnchange} />
        <div style={{ display: "flex", margin: "15px 0px", justifyContent: "end" }}>
            <button  className={styles.cancle} style={{ marginRight: "10px" }} onClick={() => { setModalIsOpen(false); handleOpenModal(false) }}>Cancle</button>
            <button  className={styles.sucess} onClick={() => {
                postFileOrFolder()
                handleOpenModal(false)
                setModalIsOpen(false)
            }}>Add</button>
        </div>
    </>
}