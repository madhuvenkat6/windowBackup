import styles from './buttonStyles.module.css'
export const DeleteFolderModal = ({ handleOpenModal, setModalIsOpen, deleteFolder, data }) => {
    return <>
        <h2>Delete folder?</h2>
        <div><b>{data.name + " "}</b> will be deleted permanently.</div>
        <div style={{ display: "flex", margin: "15px 0px", justifyContent: "end" }}>
            <button  className={styles.cancle} style={{ marginRight: "10px" }} onClick={() => { setModalIsOpen(false); handleOpenModal(false) }}>Cancle</button>
            <button  className={styles.sucess} onClick={() => {
                deleteFolder()
                handleOpenModal(false)
                setModalIsOpen(false)
            }}>Delete</button>
        </div>
    </>
}