import {useState, useContext} from "react";

import './Item.css';

import PopupWindowChangeItem from "../PopupWindowChangeItem/PopupWindowChangeItem";

import {Context} from "../../Context";

import removeIcon from '../../icons/remove-list.svg';

import pencil from '../../icons/pencil.svg';

function Item({item}) {
    
    const {removeItem, toggleCompleteItem} = useContext(Context);

    const [popup, setPopup] = useState(false);
    
    function openPopup() {
        setPopup(true)
    }

    function closePopup() {
        setPopup(false)
    }


    return (
        
        <div>
            {
                popup && <PopupWindowChangeItem closePopup={closePopup} idList={item.idOfList}  idItem={item.idOfItem} />
            }
            
            <div className="item-card">
                <div className="heading-and-icons-item-card">
                    <div className="heading-and-checkbox-label-item-card">
                        <label className="checkbox-label-item-card">
                            <input type="checkbox" checked={item.completed} onChange={() => toggleCompleteItem(item.idOfItem, item.idOfList)}/>
                            <span className="checkbox-custom-item-card" ></span>
                        </label>
                        <h2 style={{textDecoration: item.completed ? 'line-through' : null}}>{item.nameForItem} | {item.units} </h2>
                    </div>
                    <div className="icons-item-card">
                        <div onClick={openPopup} className="edit-item-card"><img src={pencil} alt="Edit" /></div>
                        <div onClick={() => removeItem(item.idOfItem, item.idOfList)} className="remove-item-card"><img src={removeIcon} alt="Remove" /></div>
                    </div>
                </div>
                <div className="quantity-and-price-item-card">
                    <p className="quantity-item-card">{item.note}</p>
                    <p className="expected-price-item-card">Expected Price: {item.expectedPrice}</p>
                </div>
                
            </div>

        </div>
    )
}




export default Item

