import styles from './buttonStyles.module.css'
export const NewFolderModal = ({handleOnchange,setModalIsOpen,postFileOrFolder,handleOpenModal}) => {
    return <>
        <h2>Add a new folder</h2>
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