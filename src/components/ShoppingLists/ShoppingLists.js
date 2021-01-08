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
    
    const [sortByNumberOfItems, setSortByNumberOfItems] = useState({clicked: false, sort: false});
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



    return(
        <main>
            {
            popup && <PopupWindowCreateList closePopup={closePopup} />
            }
            <nav className="add-and-search">
                
                <div onClick={openPopup} className="create-new-list-btn">Create new List</div>
                <div onClick={toggleShowControlPanel} className="show-control-panel-btn">Show control panel</div>
                <div className="search-bar">
                    <input
                        type="text"
                        name="inputDataSearch"
                        onChange={handleChange}
                        value={inputDataSearch}
                    />
                    <img className="searchInputImg" alt="Search" src={searchIcon} />
                    <span className="clearSearchBtn" onClick={clearSearchBtn}><img className="clearSearchBtnImg" src={clearSearch} alt="Clear Search" /></span>
                </div>                              
            </nav>
            
            

            {

            showControlPanel &&

            <div className="control-elements">
                
                <nav className="control-elements-row">
                    <div onClick={() => setCompletedFilterList({all: true, completed: false, uncompleted: false})} className="control-elements-btn">Show All Lists</div>
                    <div onClick={() => setCompletedFilterList({all: false, completed: true, uncompleted: false})} className="control-elements-btn">Show Completed Lists</div>
                    <div onClick={() => setCompletedFilterList({all: false, completed: false, uncompleted: true})} className="control-elements-btn">Show Uncompleted Lists</div>
                </nav>

                <nav className="control-elements-row">
                    <div onClick={toggleSortByNumberOfItems} className="control-elements-btn">Sort by number of items</div>
                    <div onClick={toggleSortByAlphabet} className="control-elements-btn">Sort by Alphabet</div>
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
