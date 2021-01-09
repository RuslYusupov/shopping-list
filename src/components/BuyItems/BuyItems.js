import {useState, useContext} from "react";
import {useParams, Link} from "react-router-dom";

import './BuyItems.css';

import {Context} from "../../Context";

import PopupWindowAddItem from "../PopupWindowAddItem/PopupWindowAddItem";
import ConditionalItems from "../ConditionalItems/ConditionalItems";
import VisualisationDonutComponent from "../VisualisationDonutComponent/VisualisationDonutComponent";

import backNavigationalIcon from '../../icons/back-navigational.svg';


function BuyItems() {
    
    const {listId} = useParams(); // Получили необходимый нам ID
    //console.log(listId);
    
    const {listItems, toggleCompleteList, removeAllItems, dataForVisualisationFunc} = useContext(Context); // Получили все данные 
    //console.log(listItems);

    const currentList = listItems.filter(el => el.idOfList === listId); // Получили необходимый нам список (объект), но он находится в массиве
    //console.log(currentList);

    const [currentListObj] = currentList; // Извлекли нужный нам объект (лист) из массива с помощью destructuring массива
    //console.log(currentListObj);

    const {nameForList, buyBy, items, idOfList, expectedCost, visualisationData} = currentListObj; // Сделали destructuring на объекте
    //console.log(nameForList);


    const [popup, setPopup] = useState(false);
    
    function openPopup() {
        setPopup(true)
    }

    function closePopup() {
        setPopup(false)
    }

    const [completedFilterItem, setCompletedFilterItem] = useState({all: true, completed: false, uncompleted: false});

    const [sortByExpectedPrice, setSortByExpectedPrice] = useState({clicked: false, sort: false});
    
    const [sortByAlphabet, setSortByAlphabet] = useState({clicked: false, sort: false});

    function toggleSortByExpectedPrice() {
        setSortByAlphabet(prevSortByAlphabet => ({clicked: false, sort: prevSortByAlphabet.sort})); // Отменяем сортировку по алфавиту
        setSortByExpectedPrice(prevSortByExpectedPrice => ({clicked: true, sort: !prevSortByExpectedPrice.sort})); // Включаем сортировку по цене
    }
    
    function toggleSortByAlphabet() {
        setSortByExpectedPrice(prevSortByExpectedPrice => ({clicked: false, sort: prevSortByExpectedPrice.sort})); // // Отменяем сортировку по цене
        setSortByAlphabet(prevSortByAlphabet => ({clicked: true, sort: !prevSortByAlphabet.sort})); //  Включаем сортировку по алфавиту
    }

    const [visualisationDonut, setVisualisationDonut] = useState(false);
    

    function openVisualisationDonut() {
        dataForVisualisationFunc(idOfList); // Создает массив для визуализации данных
        setVisualisationDonut(true);
    }

    function closeVisualisationDonut() {
        setVisualisationDonut(false);
    }


    const [showControlPanel, setShowControlPanel] = useState(false);
    function toggleShowControlPanel() {
        setShowControlPanel(prevShowControlPanel => !prevShowControlPanel);
    }

    let showOrHide;
    if(showControlPanel) {
        showOrHide = "Hide";
    } else if (!showControlPanel) {
        showOrHide = "Show";
    }




    return (
        <main>   
                <div className="back-to-lists-block">
                    <Link to="/" style={{ color: 'black' }}><span className="back-to-lists-btn">Back to lists</span></Link>
                    <div className="back-navigational-icon-container"><img className="back-navigational-icon" src={backNavigationalIcon} alt="Navigation Arrow" /></div>
                </div>
                
                {
                    popup && <PopupWindowAddItem closePopup={closePopup} currentListObj={currentListObj} listId={listId} />
                }
                <h1 className="heading-in-list">{nameForList}</h1>  
                

                {
                    buyBy !== "" ?
                        <h2 className="subtitle-in-list">Buy by: {buyBy}</h2>
                    :
                    null
                }

                {
                    expectedCost !== "No price set" ?
                    <h2 className="subtitle-in-list">Expected Cost: {expectedCost}</h2>
                    :
                    null
                }
                
                
                <div className="add-and-control">
                    <div onClick={openPopup} className="add-item-btn">Add New Item</div>
                    
                    <div onClick={toggleShowControlPanel} className="show-control-pan-btn">{showOrHide} control panel</div>
                
                </div>

                
                {

                showControlPanel &&

                <div className="control-elements">
                    
                    <nav className="control-elements-row">
                        <div onClick={openVisualisationDonut} className="control-elements-btn">Visualization of expenses</div>
                        <div className="control-elements-btn" onClick={() => toggleCompleteList(idOfList)}>Complete / Uncomplete All Items</div>
                        <div className="control-elements-btn" onClick={() => removeAllItems(idOfList)}>Remove All Items</div>
                    </nav>
                    
                    <nav className="control-elements-row">
                        <div onClick={() => setCompletedFilterItem({all: true, completed: false, uncompleted: false})} className="control-elements-btn">Show All Items</div>
                        <div onClick={() => setCompletedFilterItem({all: false, completed: true, uncompleted: false})} className="control-elements-btn">Show Completed Items</div>
                        <div onClick={() => setCompletedFilterItem({all: false, completed: false, uncompleted: true})} className="control-elements-btn">Show Uncompleted Items</div>
                    </nav>
                    <nav className="control-elements-row">
                        <div onClick={toggleSortByExpectedPrice} className="control-elements-btn">Sort by Expected Price</div>
                        <div onClick={toggleSortByAlphabet} className="control-elements-btn">Sort by Alphabet</div>
                    </nav>
                
                </div>
                }
                
                {
                    visualisationDonut && <VisualisationDonutComponent closeVisualisationDonut={closeVisualisationDonut} visualisationData={visualisationData} />
                }
                
                
                

                
                <div className="forWrapItem">
                    <ConditionalItems items={items} completedFilterItem={completedFilterItem} sortByAlphabet={sortByAlphabet} sortByExpectedPrice={sortByExpectedPrice} />
                </div>
                
            
        </main>
    )
}


export default BuyItems