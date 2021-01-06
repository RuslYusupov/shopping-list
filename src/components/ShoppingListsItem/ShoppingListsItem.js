import {useState, useContext} from "react";

import {Link} from 'react-router-dom';

import {Context} from "../../Context";

import './ShoppingListsItem.css';

import PopupWindowChangeList from "../PopupWindowChangeList/PopupWindowChangeList";

import removeIcon from '../../icons/remove-list.svg';
import goInList from '../../icons/go-in-list.svg';
import pencil from '../../icons/pencil.svg';

function ShoppingListsItem({nameForList, buyBy, items, idOfList, completed, expectedCost}) {
    
    const {removeListItem, toggleCompleteList} = useContext(Context);

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
                popup && <PopupWindowChangeList closePopup={closePopup} id={idOfList} />
            }
            
            <div className="shopping-list-item-card">
                <div className="heading-and-icons-list-item-card">
                    <div className="heading-and-checkbox-label-list-item-card">
                        <label className="checkbox-label-list-item-card">
                            <input type="checkbox" checked={completed} onChange={() => toggleCompleteList(idOfList)}/>
                            <span className="checkbox-custom-list-item-card"></span>
                        </label>
                        <Link to={`/${idOfList}`} style={{ color: 'black' }}><h2 style={{textDecoration: completed ? 'line-through' : null}}>{nameForList} | Buy by: {buyBy}</h2></Link>
                    </div>
                    <div className="icons-list-item-card">
                        <Link to={`/${idOfList}`} style={{ textDecoration: 'none' }}><div className="goIn-list-item-card"><img src={goInList} alt="GoIn" /></div></Link>
                        <div onClick={openPopup} className="edit-list-item-card"><img src={pencil} alt="Edit" /></div>
                        <div onClick={() => {removeListItem(idOfList)}} className="remove-list-item-card"><img src={removeIcon} alt="Remove" /></div>
                    </div>
                </div>
                <div className="quantity-and-cost-list-item-card">
                    <p className="quantity-list-item-card">{items.length} Items</p>
                    <p className="expected-cost-list-item-card">Expected Cost: {expectedCost}</p>
                </div>
            </div>

        </div>
    )
}

export default ShoppingListsItem

