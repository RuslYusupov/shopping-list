import {useState, useContext} from "react";

import './ShoppingLists.css';

import {Context} from "../../Context";

import PopupWindowCreateList from "../PopupWindowCreateList/PopupWindowCreateList";
import searchIcon from '../../icons/search.svg';

import ConditionalLists from "../ConditionalLists/ConditionalLists";

import clearSearch from '../../icons/clear-search.svg';

function ShoppingLists() {
    
    const {removeAllLists} = useContext(Context);

    const [popup, setPopup] = useState(false);
    
    function openPopup() {
        setPopup(true)
    }

    function closePopup() {
        setPopup(false)
    }

    const [completedFilterList, setCompletedFilterList] = useState({all: true, completed: false, uncompleted: false});
    
    const [sortByNumberOfItems, setSortByNumberOfItems] = useState({clicked: false, sort: true});
    const [sortByAlphabet, setSortByAlphabet] = useState({clicked: false, sort: false});


    function toggleSortByNumberOfItems() {
        setSortByAlphabet(prevSortByAlphabet => ({clicked: false, sort: prevSortByAlphabet.sort})); // Отменяем сортировку по алфавиту
        setSortByNumberOfItems(prevSortByNumberOfItems => ({clicked: true, sort: !prevSortByNumberOfItems.sort})); // Включаем сортировку по количеству айтемов
    }

    function toggleSortByAlphabet() {
        setSortByNumberOfItems(prevSortByNumberOfItems => ({clicked: false, sort: prevSortByNumberOfItems.sort})); // Отменяем сортировку по количеству айтемов
        setSortByAlphabet(prevSortByAlphabet => ({clicked: true, sort: !prevSortByAlphabet.sort})); // Включаем сортировку по алфавиту
    }

    // Search
    
    const [inputDataSearch, setInputDataSearch] = useState("");


    function handleChange(event) {
        const {value} = event.target
        setInputDataSearch(value); 
    }

    function clearSearchBtn() {
        setInputDataSearch("");
    }

    // Search end


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


    let sortNumberOfItemText;
    if(sortByNumberOfItems.sort === false) {
        sortNumberOfItemText = "100 - 0";
    } else if (sortByNumberOfItems.sort === true) {
        sortNumberOfItemText = "0 - 100";
    }

    let sortAlphabetText;
    if(sortByAlphabet.sort === false) {
        sortAlphabetText = "A - Z";
    } else if (sortByAlphabet.sort === true) {
        sortAlphabetText = "Z - A";
    }

    let colorOfShowAllBtn;
    if(completedFilterList.all === true) {
        colorOfShowAllBtn = "control-elements-btn-green";
    } else if (completedFilterList.all === false) {
        colorOfShowAllBtn = "control-elements-btn";
    }

    let colorOfShowCompletedBtn;
    if(completedFilterList.completed === true) {
        colorOfShowCompletedBtn = "control-elements-btn-green";
    } else if (completedFilterList.completed === false) {
        colorOfShowCompletedBtn = "control-elements-btn";
    }

    let colorOfShowUncompletedBtn;
    if(completedFilterList.uncompleted === true) {
        colorOfShowUncompletedBtn = "control-elements-btn-green";
    } else if (completedFilterList.uncompleted === false) {
        colorOfShowUncompletedBtn = "control-elements-btn";
    }


    return(
        <main>
            {
            popup && <PopupWindowCreateList closePopup={closePopup} />
            }
            <nav className="add-and-search">
                
                <div onClick={openPopup} className="create-new-list-btn">Create new List</div>
                
                <div onClick={toggleShowControlPanel} className="show-control-panel-btn">{showOrHide} control panel</div>
                
                <div className="search-bar">
                    <input
                        type="text"
                        name="inputDataSearch"
                        onChange={handleChange}
                        value={inputDataSearch}
                    />
                    <img className="search-input-img" alt="Search" src={searchIcon} />
                    <div className="clear-search-btn" onClick={clearSearchBtn}><img className="clear-search-btn-img" src={clearSearch} alt="Clear Search" /></div>
                </div>                              
            </nav>
            
            

            {

            showControlPanel &&

            <div className="control-elements">
                
                <nav className="control-elements-row">
                    <div onClick={() => setCompletedFilterList({all: true, completed: false, uncompleted: false})} className={colorOfShowAllBtn}>Show All Lists</div>
                    <div onClick={() => setCompletedFilterList({all: false, completed: true, uncompleted: false})} className={colorOfShowCompletedBtn}>Show Completed Lists</div>
                    <div onClick={() => setCompletedFilterList({all: false, completed: false, uncompleted: true})} className={colorOfShowUncompletedBtn}>Show Uncompleted Lists</div>
                </nav>

                <nav className="control-elements-row">
                    <div onClick={toggleSortByNumberOfItems} className="control-elements-btn">Sort by Number of Items ({sortNumberOfItemText})</div>
                    <div onClick={toggleSortByAlphabet} className="control-elements-btn">Sort Names by Alphabet ({sortAlphabetText})</div>
                    <div onClick={removeAllLists} className="control-elements-btn">Remove all Lists</div>
                </nav>
                
            </div>

            
            }
            
            <div className="forWrapList">
                <ConditionalLists completedFilterList={completedFilterList} sortByNumberOfItems={sortByNumberOfItems} sortByAlphabet={sortByAlphabet} inputDataSearch={inputDataSearch} />
            </div>

        </main>
    )
}

export default ShoppingLists;
