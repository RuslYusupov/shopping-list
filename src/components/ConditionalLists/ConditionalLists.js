import {useContext} from "react";

import './ConditionalLists.css';

import ShoppingListsItem from "../ShoppingListsItem/ShoppingListsItem";


import {Context} from "../../Context";

function ConditionalLists(props) {
    
    const {listItems} = useContext(Context);
    
    let conditionalComletedFilter;

    if(props.completedFilterList.all === true && props.sortByNumberOfItems.clicked === false && props.sortByAlphabet.clicked === false && props.inputDataSearch === "") {
        conditionalComletedFilter = listItems.map((item, i) => 
        <div key={i}> 
            <ShoppingListsItem
            nameForList = {item.nameForList} 
            buyBy = {item.buyBy}
            items = {item.items}
            idOfList = {item.idOfList}
            completed = {item.completed}
            expectedCost = {item.expectedCost}
            visualisationData = {item.visualisationData}
            />
         </div>
                                    ); // Ситуация при первой загрузке - отображаются все листы и не было клика по сортировке по числу айтемов и не было клика по сортировке по алфавиту
    } else if(props.completedFilterList.completed === true && props.sortByNumberOfItems.clicked === false && props.sortByAlphabet.clicked === false && props.inputDataSearch === "") {
        const onlyCompleted = listItems.filter(el => el.completed === true);
        //console.log(onlyCompleted);
        conditionalComletedFilter = onlyCompleted.map((item, i) => 
        <div key={i}> 
            <ShoppingListsItem
            nameForList = {item.nameForList} 
            buyBy = {item.buyBy}
            items = {item.items}
            idOfList = {item.idOfList}
            completed = {item.completed}
            expectedCost = {item.expectedCost}
            visualisationData = {item.visualisationData}
            />
         </div>
                                    ); // отображаются выполненные листы и не было клика по сортировке по числу айтемов и не было клика по сортировке по алфавиту
    } else if(props.completedFilterList.uncompleted === true && props.sortByNumberOfItems.clicked === false && props.sortByAlphabet.clicked === false && props.inputDataSearch === "") {
        const onlyUncompleted = listItems.filter(el => el.completed === false);
        conditionalComletedFilter = onlyUncompleted.map((item, i) => 
        <div key={i}> 
            <ShoppingListsItem
            nameForList = {item.nameForList} 
            buyBy = {item.buyBy}
            items = {item.items}
            idOfList = {item.idOfList}
            completed = {item.completed}
            expectedCost = {item.expectedCost}
            visualisationData = {item.visualisationData}
            />
         </div>
                                    ); // отображаются не выполненные листы и не было клика по сортировке по числу айтемов и не было клика по сортировке по алфавиту

// Здесь обрабатывается клик по сортировке по числу айтемов
    } else if(props.completedFilterList.all === true && props.sortByNumberOfItems.clicked === true && props.sortByNumberOfItems.sort === true && props.inputDataSearch === "") {
        const copyOfListItems = [...listItems];

        conditionalComletedFilter = copyOfListItems.sort((a, b) => b.items.length > a.items.length ? 1 : -1)
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются все листы и был клик по сортировке по числу айтемов и сортировка от бесконечности до 0 - здесь и далее - если нужно, чтобы была обратная сортировка - то нужно a поставить больше b
    } else if(props.completedFilterList.all === true && props.sortByNumberOfItems.clicked === true && props.sortByNumberOfItems.sort === false && props.inputDataSearch === "") {
        const copyOfListItems = [...listItems];

        conditionalComletedFilter = copyOfListItems.sort((a, b) => a.items.length > b.items.length ? 1 : -1)
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются все листы и был клик по сортировке по числу айтемов и сортировка от 0 до бесконечности
    } else if(props.completedFilterList.completed === true && props.sortByNumberOfItems.clicked === true && props.sortByNumberOfItems.sort === true && props.inputDataSearch === "") {
        const onlyCompleted = listItems.filter(el => el.completed === true);
        //console.log(onlyCompleted);
        conditionalComletedFilter = onlyCompleted.sort((a, b) => b.items.length > a.items.length ? 1 : -1)
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются выполненные листы и был клик по сортировке по числу айтемов и сортировка от бесконечности до 0
    } else if(props.completedFilterList.completed === true && props.sortByNumberOfItems.clicked === true && props.sortByNumberOfItems.sort === false && props.inputDataSearch === "") {
        const onlyCompleted = listItems.filter(el => el.completed === true);
        //console.log(onlyCompleted);
        conditionalComletedFilter = onlyCompleted.sort((a, b) => a.items.length > b.items.length ? 1 : -1)
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются выполненные листы и был клик по сортировке по числу айтемов и сортировка от 0 до бесконечности
    } else if(props.completedFilterList.uncompleted === true && props.sortByNumberOfItems.clicked === true && props.sortByNumberOfItems.sort === true && props.inputDataSearch === "") {
        const onlyUncompleted = listItems.filter(el => el.completed === false);
        //console.log(onlyUncompleted);
        conditionalComletedFilter = onlyUncompleted.sort((a, b) => b.items.length > a.items.length ? 1 : -1)
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются не выполненные листы и был клик по сортировке по числу айтемов и сортировка от бесконечности до 0
    } else if(props.completedFilterList.uncompleted === true && props.sortByNumberOfItems.clicked === true && props.sortByNumberOfItems.sort === false && props.inputDataSearch === "") {
        const onlyUncompleted = listItems.filter(el => el.completed === false);
        //console.log(onlyUncompleted);
        conditionalComletedFilter = onlyUncompleted.sort((a, b) => a.items.length > b.items.length ? 1 : -1)
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются не выполненные листы и был клик по сортировке по числу айтемов и сортировка от 0 до бесконечности

 // Здесь обрабатывается клик по сортировке по алфавиту    
    } else if(props.completedFilterList.all === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === true && props.inputDataSearch === "") {
        const copyOfListItems = [...listItems];
        console.log(copyOfListItems);

        conditionalComletedFilter = copyOfListItems.sort((a, b) => a.nameForList.localeCompare(b.nameForList))
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются все листы и был клик по сортировке по алфавиту и сортировка от я до а - здесь и далее - если нужно, чтобы была обратная сортировка - то нужно a поставить больше b
        console.log(conditionalComletedFilter);
    } else if(props.completedFilterList.all === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === false && props.inputDataSearch === "") {
        const copyOfListItems = [...listItems];
        console.log(copyOfListItems);

        conditionalComletedFilter = copyOfListItems.sort((a, b) => b.nameForList.localeCompare(a.nameForList))
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются все листы и был клик по сортировке по алфавиту и сортировка от а до я
        console.log(conditionalComletedFilter);
    } else if(props.completedFilterList.completed === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === true && props.inputDataSearch === "") {
        const onlyCompleted = listItems.filter(el => el.completed === true);
        conditionalComletedFilter = onlyCompleted.sort((a, b) => a.nameForList.localeCompare(b.nameForList))
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются все листы и был клик по сортировке по алфавиту и сортировка от я до а
    } else if(props.completedFilterList.completed === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === false && props.inputDataSearch === "") {
        const onlyCompleted = listItems.filter(el => el.completed === true);
        conditionalComletedFilter = onlyCompleted.sort((a, b) => b.nameForList.localeCompare(a.nameForList))
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются все листы и был клик по сортировке по алфавиту и сортировка от я до а
    } else if(props.completedFilterList.uncompleted === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === true && props.inputDataSearch === "") {
        const onlyUncompleted = listItems.filter(el => el.completed === false);
        conditionalComletedFilter = onlyUncompleted.sort((a, b) => a.nameForList.localeCompare(b.nameForList))
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются все листы и был клик по сортировке по алфавиту и сортировка от я до а
    } else if(props.completedFilterList.uncompleted === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === false && props.inputDataSearch === "") {
        const onlyUncompleted = listItems.filter(el => el.completed === false);
        conditionalComletedFilter = onlyUncompleted.sort((a, b) => b.nameForList.localeCompare(a.nameForList))
        .map((item, i) => 
            <div key={i}> 
                <ShoppingListsItem
                nameForList = {item.nameForList} 
                buyBy = {item.buyBy}
                items = {item.items}
                idOfList = {item.idOfList}
                completed = {item.completed}
                expectedCost = {item.expectedCost}
                visualisationData = {item.visualisationData}
                />
             </div>
        ); // отображаются все листы и был клик по сортировке по алфавиту и сортировка от я до а
    } 
    else if(props.inputDataSearch !== "") {
        const ourListObjForSearch = listItems.filter(list => list.nameForList.includes(props.inputDataSearch)); // Находим нужные нам листы
        console.log(ourListObjForSearch);
        if(ourListObjForSearch.length > 0) { // Если листы найдены, то переобходим их и выводим их 
            conditionalComletedFilter = ourListObjForSearch.map((item, i) =>
                <div key={i}> 
                    <ShoppingListsItem
                        nameForList = {item.nameForList} 
                        buyBy = {item.buyBy}
                        items = {item.items}
                        idOfList = {item.idOfList}
                        completed = {item.completed}
                        expectedCost = {item.expectedCost}
                        visualisationData = {item.visualisationData}
                    />
                </div>
            );                        // В поиске что-то написано
        } else if(ourListObjForSearch.length === 0) { 
            conditionalComletedFilter = <p className="no-lists-in-search">There are no lists that satisfy the search</p>
        } // Если не найдены, то выводим соответсвующий текст
    }


    return (
        <div>
             {conditionalComletedFilter}
        </div>    
       
    )
}

export default ConditionalLists;