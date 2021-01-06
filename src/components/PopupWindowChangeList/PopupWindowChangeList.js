import {useState, useContext} from "react";
import {Context} from "../../Context";

function PopupWindowChangeList(props) {
    
    const [inputData, setInputData] = useState({nameForList: "", buyBy: ""});

    const {changeList} = useContext(Context);

    function handleChange(event) {
        const {name, value} = event.target
        setInputData(prevInputData => ({...prevInputData, [name]: value}))
    }


    return (
        <div className="popup-window-list">
            <div onClick={props.closePopup} className="close-popup-window-list">
                <span>X</span>
            </div>
            <h1 className="note-in-popup-window-list">Change the data only that you want to change. You don't need to fill in all 2 fields. An empty field will use the previous data</h1>
            <p className="first-heading-in-popup-window-list-change">Change Name For The List:</p>
            <input
                type="text"
                name="nameForList"
                onChange={handleChange}
                value={inputData.nameForList}
             />
            <p className="second-heading-in-popup-window-list">Change Buy By:</p>
            <input
                type="text"
                name="buyBy"
                onChange={handleChange}
                value={inputData.buyBy}
             />
            <button onClick={() => changeList(props.id, inputData.nameForList, inputData.buyBy, props.closePopup)} className="popup-window-list-btn">Change List</button>
        </div>
    )
}

export default PopupWindowChangeList