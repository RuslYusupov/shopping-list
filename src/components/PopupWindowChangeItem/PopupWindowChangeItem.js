import {useState, useContext} from "react";
import {Context} from "../../Context";

function PopupWindowChangeItem(props) {
    
    const [inputData, setInputData] = useState({nameForItem: "", units: "", expectedPrice: "", note: ""});

    const {changeItem} = useContext(Context);

    function handleChange(event) {
        const {name, value} = event.target
        setInputData(prevInputData => ({...prevInputData, [name]: value}))
    }
    
    return (
        <div className="popup-window-item">
        <div onClick={props.closePopup} className="close-popup-window-item">
            <span>X</span>
        </div>
        <h1 className="note-in-popup-window-item">Change the data only that you want to change. You don't need to fill in all 4 fields. An empty field will use the previous data</h1>
        <p className="first-heading-in-popup-window-item-change">Change Name for the item</p>
        <input
            type="text"
            name="nameForItem"
            onChange={handleChange}
            value={inputData.nameForItem}
         />
        <p className="second-heading-in-popup-window-item">Change Units</p>
        <input
            type="text"
            name="units"
            onChange={handleChange}
            value={inputData.units}
         />
         <p className="second-heading-in-popup-window-item">Change Expected Price</p>
        <input
            type="number"
            name="expectedPrice"
            onChange={handleChange}
            value={inputData.expectedPrice}
         />
         <p className="second-heading-in-popup-window-item">Change Note</p>
        <input
            type="text"
            name="note"
            onChange={handleChange}
            value={inputData.note}
         />
        <button onClick={() => changeItem(props.idList, props.idItem, inputData.nameForItem, inputData.units, inputData.expectedPrice, inputData.note, props.closePopup)} className="popup-window-btn-item">Change item</button>
    </div>
    )
}

export default PopupWindowChangeItem;