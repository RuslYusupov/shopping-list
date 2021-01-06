import './PopupWindowCreateList.css';
import { v4 as uuidv4 } from 'uuid'; // Библиотека для генерации случайного ID

import {useState, useContext} from "react";
import {Context} from "../../Context";

function PopupWindowCreateList({closePopup}) {
    
    const [inputData, setInputData] = useState({nameForList: "", buyBy: ""});

    const {setListItems} = useContext(Context);

    function handleChange(event) {
        const {name, value} = event.target
        setInputData(prevInputData => ({...prevInputData, [name]: value}))
    }

    function createList() {
        setListItems(prevListItems => {
            return [{nameForList: inputData.nameForList,
                    buyBy: inputData.buyBy,
                    items: [],
                    idOfList: uuidv4(),
                    completed: false,
                    expectedCost: "No price set",
                    visualisationData: []
                    }, 
                    ...prevListItems]
        })
        closePopup();
    }


    return (
        <div className="popup-window-list">
            <div onClick={closePopup} className="close-popup-window-list">
                <span>X</span>
            </div>
            <p className="first-heading-in-popup-window-list">Name for the list</p>
            <input
                type="text"
                name="nameForList"
                onChange={handleChange}
                value={inputData.nameForList}
             />
            <p className="second-heading-in-popup-window-list">Buy by</p>
            <input
                type="text"
                name="buyBy"
                onChange={handleChange}
                value={inputData.buyBy}
             />
            <button disabled={!inputData.nameForList} onClick={createList} className="popup-window-list-btn">Create List</button>
        </div>
        
    )
}

export default PopupWindowCreateList;