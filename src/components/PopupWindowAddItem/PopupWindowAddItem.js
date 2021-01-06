import './PopupWindowAddItem.css';
import { v4 as uuidv4 } from 'uuid'; // Библиотека для генерации случайного ID

import {useState, useContext} from "react";
import {Context} from "../../Context";

function PopupWindowAddItem({closePopup, currentListObj, listId}) {
    
    const [inputData, setInputData] = useState({nameForItem: "", units: "", expectedPrice: "", note: ""});

    const {setListItems, calculateExpectedCostForOneList} = useContext(Context);

    function handleChange(event) {
        const {name, value} = event.target
        setInputData(prevInputData => ({...prevInputData, [name]: value}))
    }


    // В текущий лист в айтемы закидываем новый айтем
    function createItem() {
        
        let price; // Отображаем текст если для айтема на задана цена

        if(inputData.expectedPrice === "") {
            price = "No price set";
        } else {
            price = inputData.expectedPrice;
        }


        currentListObj.items = [{nameForItem: inputData.nameForItem,
                                units: inputData.units,
                                expectedPrice: price,
                                note: inputData.note,
                                idOfItem: uuidv4(),
                                idOfList: listId,
                                completed: false
                                }, ...currentListObj.items];

        setListItems(prevListItems => {
            // Часть 1 - устанавливаем для текущего листа, куда добавляем новый айтем - completed на значение false
            currentListObj.completed = false;
            // Часть 2 - получаем все элементы листов и возвращаем с ними текущий лист
            const listElementsWithOneRemove = prevListItems.filter(el => el.idOfList !== listId);
            return [currentListObj, ...listElementsWithOneRemove];
        })                 

        calculateExpectedCostForOneList(listId); // Рассчитываем сумму всех айтемов в листе



        closePopup();
    }
    

    return (
        <div className="popup-window-item">
        <div onClick={closePopup} className="close-popup-window-item">
            <span>X</span>
        </div>
        <p className="first-heading-in-popup-window-item">Name for the item</p>
        <input
            type="text"
            name="nameForItem"
            onChange={handleChange}
            value={inputData.nameForItem}
         />
        <p className="second-heading-in-popup-window-item">Units</p>
        <input
            type="text"
            name="units"
            onChange={handleChange}
            value={inputData.units}
         />
          <p className="second-heading-in-popup-window-item">Expected Price (Write only the number)</p>
        <input
            type="number"
            name="expectedPrice"
            onChange={handleChange}
            value={inputData.expectedPrice}
         />
         <p className="second-heading-in-popup-window-item">Note</p>
        <input
            type="text"
            name="note"
            onChange={handleChange}
            value={inputData.note}
         />
        <button disabled={!inputData.nameForItem} onClick={createItem} className="popup-window-btn-item">Add item</button>
    </div>
    )
}


export default PopupWindowAddItem;