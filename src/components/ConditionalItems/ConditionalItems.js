import Item from "../Item/Item";

function ConditionalItems(props) {
    
    let conditionalComletedFilter;

    if(props.completedFilterItem.all === true && props.sortByExpectedPrice.clicked === false && props.sortByAlphabet.clicked === false) {
        conditionalComletedFilter = props.items && props.items.map((item, i) => <div key={i}> <Item item={item} /> </div>); // Ситуация при первой загрузке - отображаются все айтемы и не было клика по сортировке по алфавиту и не было клика по сортировке по цене
    } else if(props.completedFilterItem.completed === true && props.sortByExpectedPrice.clicked === false && props.sortByAlphabet.clicked === false) {
        const onlyCompleted = props.items.filter(el => el.completed === true);
        conditionalComletedFilter = onlyCompleted.map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все выполненные айтемы и не было клика по сортировке по алфавиту и не было клика по сортировке по цене
    } else if(props.completedFilterItem.uncompleted === true && props.sortByExpectedPrice.clicked === false && props.sortByAlphabet.clicked === false) {
        const onlyUncompleted = props.items.filter(el => el.completed === false);
        conditionalComletedFilter = onlyUncompleted.map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все не выполненные айтемы и не было клика по сортировке по алфавиту и не было клика по сортировке по цене
    } else if(props.completedFilterItem.all === true && props.sortByExpectedPrice.clicked === true && props.sortByExpectedPrice.sort === true) {
        const copyOfItems = props.items && [...props.items];
        conditionalComletedFilter = copyOfItems.sort((a, b) => b.expectedPrice > a.expectedPrice ? 1 : -1).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все айтемы и был клик по сортировке по цена и сортировка от бесконечности до 0
    } else if(props.completedFilterItem.all === true && props.sortByExpectedPrice.clicked === true && props.sortByExpectedPrice.sort === false) {
        const copyOfItems = props.items && [...props.items];
        conditionalComletedFilter = copyOfItems.sort((a, b) => a.expectedPrice > b.expectedPrice ? 1 : -1).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все айтемы и был клик по сортировке по цена и сортировка от бесконечности до 0
    } else if(props.completedFilterItem.completed === true && props.sortByExpectedPrice.clicked === true && props.sortByExpectedPrice.sort === true) {
        const onlyCompleted = props.items.filter(el => el.completed === true);
        conditionalComletedFilter = onlyCompleted.sort((a, b) => b.expectedPrice > a.expectedPrice ? 1 : -1).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все айтемы и был клик по сортировке по цена и сортировка от бесконечности до 0
    } else if(props.completedFilterItem.completed === true && props.sortByExpectedPrice.clicked === true && props.sortByExpectedPrice.sort === false) {
        const onlyCompleted = props.items.filter(el => el.completed === true);
        conditionalComletedFilter = onlyCompleted.sort((a, b) => a.expectedPrice > b.expectedPrice ? 1 : -1).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все айтемы и был клик по сортировке по цена и сортировка от бесконечности до 0
    } else if(props.completedFilterItem.uncompleted === true && props.sortByExpectedPrice.clicked === true && props.sortByExpectedPrice.sort === true) {
        const onlyUncompleted = props.items.filter(el => el.completed === false);
        conditionalComletedFilter = onlyUncompleted.sort((a, b) => b.expectedPrice > a.expectedPrice ? 1 : -1).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все айтемы и был клик по сортировке по цена и сортировка от бесконечности до 0
    } else if(props.completedFilterItem.uncompleted === true && props.sortByExpectedPrice.clicked === true && props.sortByExpectedPrice.sort === false) {
        const onlyUncompleted = props.items.filter(el => el.completed === false);
        conditionalComletedFilter = onlyUncompleted.sort((a, b) => a.expectedPrice > b.expectedPrice ? 1 : -1).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все айтемы и был клик по сортировке по цена и сортировка от бесконечности до 0
    } else if(props.completedFilterItem.all === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === true) {
        const copyOfItems = props.items && [...props.items];
        conditionalComletedFilter = copyOfItems.sort((a, b) => a.nameForItem.localeCompare(b.nameForItem)).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все айтемы и был клик по сортировке по алфавиту и сортировка от я до а
    } else if(props.completedFilterItem.all === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === false) {
        const copyOfItems = props.items && [...props.items];
        conditionalComletedFilter = copyOfItems.sort((a, b) => b.nameForItem.localeCompare(a.nameForItem)).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все айтемы и был клик по сортировке по алфавиту и сортировка от а до я
    } else if(props.completedFilterItem.completed === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === true) {
        const onlyCompleted = props.items.filter(el => el.completed === true);
        conditionalComletedFilter = onlyCompleted.sort((a, b) => a.nameForItem.localeCompare(b.nameForItem)).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все выполненные айтемы и был клик по сортировке по алфавиту и сортировка от я до а
    } else if(props.completedFilterItem.completed === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === false) {
        const onlyCompleted = props.items.filter(el => el.completed === true);
        conditionalComletedFilter = onlyCompleted.sort((a, b) => b.nameForItem.localeCompare(a.nameForItem)).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все выполненные айтемы и был клик по сортировке по алфавиту и сортировка от а до я
    } else if(props.completedFilterItem.uncompleted === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === true) {
        const onlyUncompleted = props.items.filter(el => el.completed === false);
        conditionalComletedFilter = onlyUncompleted.sort((a, b) => a.nameForItem.localeCompare(b.nameForItem)).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все не выполненные айтемы и был клик по сортировке по алфавиту и сортировка от я до а
    } else if(props.completedFilterItem.uncompleted === true && props.sortByAlphabet.clicked === true && props.sortByAlphabet.sort === false) {
        const onlyUncompleted = props.items.filter(el => el.completed === false);
        conditionalComletedFilter = onlyUncompleted.sort((a, b) => b.nameForItem.localeCompare(a.nameForItem)).map((item, i) => <div key={i}> <Item item={item} /> </div>); // Отображаются все не выполненные айтемы и был клик по сортировке по алфавиту и сортировка от а до я
    }
    

    return (
        <div>
            {conditionalComletedFilter}
        </div>
    )
}

export default ConditionalItems;