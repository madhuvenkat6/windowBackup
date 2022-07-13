import styles from './drag.module.css'

export const DragByHtml = () => {
   
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        console.log(data);
        ev.target.appendChild(document.getElementById(data));
    }

    return <div>
        <div className={styles.div1} onDrop={(e) => { drop(e) }} onDragOver={(e) => { allowDrop(e) }}></div>
        <img id="drag1" src="https://atlas-content-cdn.pixelsquid.com/assets_v2/209/2091290628225767394/jpeg-600/G03.jpg" draggable="true" onDragStart={(e) => { drag(e) }} width="336" height="69" />
        <div className={styles.div1} onDrop={(e) => { drop(e) }} onDragOver={(e) => { allowDrop(e) }}></div>
    </div>
}