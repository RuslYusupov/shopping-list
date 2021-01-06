import React, {useState, useEffect} from 'react';

const Context = React.createContext()

const LOCAL_STORAGE_KEY = 'react-shopping-list';

function ContextProvider({children}) {

    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        const storageListItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageListItems) {
            setListItems(storageListItems);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listItems));
    }, [listItems]);


    function toggleCompleteList(id) {
        setListItems(prevListItems => {
            // Часть 1 - Делаем зачеркивание и переключение галочки в списке листов:
            const listsWithoutList = prevListItems.filter(list => list.idOfList !== id); // Удаляем нужный лист с нужными нам айтемами из списка листов
            const [ourListObj] = prevListItems.filter(list => list.idOfList === id); // Находим нужный нам лист и сразу же destructuring массив из одного объекта
            const updateOurListObj = {...ourListObj, completed: !ourListObj.completed}; // Создаем новый объект для листа с такими же свойствами (как и у предыдущего объекта листа) и в нем обновляем свойство completed на противоположное
            
            // Часть 2 - Делаем зачеркивание и переключение галочки для всех айтемов списка:
            updateOurListObj.items.forEach(el => el.completed = updateOurListObj.completed); // В новом объекте листа переобходим свойство-массив items из объектов (айтемов) и в каждом этом объекте (айтеме) меняем свойство completed на значение свойства completed самого листа
            
           
            return [...listsWithoutList, updateOurListObj]; // Возвращаем обновленный лист и все остальные листы
        })
    }


    function removeListItem(id) {
        setListItems(prevListItems => {
            return prevListItems.filter(list => list.idOfList !== id);
        })
    }


    function toggleCompleteItem(idOfItem, idOfList) {
        setListItems(prevListItems => {
            
            // Часть 1 - обрабатываем completed каждого отдельного айтема
            const listsWithoutList = prevListItems.filter(list => list.idOfList !== idOfList); // Удаляем нужный лист с нужными нам айтемами из списка листов
            const [ourListObj] = prevListItems.filter(list => list.idOfList === idOfList); // Находим нужный нам лист и сразу же destructuring массив из одного объекта
            const itemsWithoutItem = ourListObj.items.filter(item => item.idOfItem !== idOfItem); // Удаляем нужный айтем из айтемов в айтемах нужного нам листа
            const [ourItem] = ourListObj.items.filter(item => item.idOfItem === idOfItem); // Находим нужный айтем из айтемов в айтемах нужного нам листа
            //console.log(ourItem);
            const ourItemChangeCompleted = {...ourItem, completed: !ourItem.completed} // Создаем новый объект айтема и в нем используем все те же свойства, но значение свойства completed меняем на противоположное
            //console.log(ourItemChangeCompleted);
            const updateItems = [...itemsWithoutItem,  ourItemChangeCompleted]; // Обновляем свойство с айтемами в нужном нам листе - возвращаем (добавляем) туда обновленный айтем
            //console.log(updateItems);
            const updateOurListObj = {...ourListObj, items: updateItems}; // Создаем новый объект для листа с такими же свойствами (как и у предыдущего объекта листа) и в нем обновляем свойство items
            
            //return [updateOurListObj, ...listsWithoutList]; // Часть 1 без второй части бы завершилась так - возвращаем обновленный лист и все остальные листы

            // Часть 2 - если все айтемы completed, то меняем свойсво completed у Листа на true. А если все айтемы не completed, то меняем свойство completed у Листа на false

            const checkCompletedOnEveryItemInList = updateOurListObj.items.map(el => el.completed); // Переобходим каждый айтем в листе и сохраняем в массив его свойство completed
            //console.log(checkCompletedOnEveryItemInList); 
            const allCompleted = checkCompletedOnEveryItemInList.every(el => el === true); // Проверяем каждый элемент на true - если каждый элемент массива будет true, то вернется true
            //console.log(allCompleted);

            if(allCompleted) {
                updateOurListObj.completed = true;
                return [updateOurListObj, ...listsWithoutList];
            } else {
                updateOurListObj.completed = false;
                return [updateOurListObj, ...listsWithoutList];
            }
            
        })
    }

    function removeItem(idOfItem, idOfList) {
        setListItems(prevListItems => {
            const listsWithoutList = prevListItems.filter(list => list.idOfList !== idOfList); // Удаляем нужный лист с нужными нам айтемами из списка листов
            const [ourListObj] = prevListItems.filter(list => list.idOfList === idOfList); // Находим нужный нам лист и сразу же destructuring массив из одного объекта
            const itemsWithoutItem = ourListObj.items.filter(item => item.idOfItem !== idOfItem); // Удаляем нужный айтем из айтемов в айтемах нужного нам листа
            ourListObj.items = itemsWithoutItem; // Обновляем свойство с айтемами в нужном на листе
            if(ourListObj.items.length === 0) {
                ourListObj.completed = false; // В данном if делаем так чтобы при выполненных, а затем удаленных айтемах в какой нибудь листе - в списке листов - лист не показывался как выполненный
                return [ourListObj, ...listsWithoutList]; // возвращаем обновленный лист и все остальные листы
            }
            return [ourListObj, ...listsWithoutList]; // возвращаем обновленный лист и все остальные листы
        })
    }

    function removeAllLists() {
        setListItems([]);
        // Возможно также кнопка откуда вызывается эта функци не должна быть ссылкой на главную - а в этой функции мы должны редиректить на главную - например использовать history.push
    }

    function removeAllItems(id) {
        setListItems(prevListItems => {
            const listsWithoutList = prevListItems.filter(list => list.idOfList !== id); // Удаляем нужный лист с нужными нам айтемами из списка листов
            const [ourListObj] = prevListItems.filter(list => list.idOfList === id); // Находим нужный нам лист и сразу же destructuring массив из одного объекта
            ourListObj.items = []; // Очищаем свойство-массив items в нужном нам листе-объекте
            if(ourListObj.items.length === 0) {
                ourListObj.completed = false; // В данном if делаем так чтобы при выполненных, а затем удаленных айтемах в какой нибудь листе - в списке листов - лист не показывался как выполненный
                return [ourListObj, ...listsWithoutList]; // возвращаем обновленный лист и все остальные листы
            }
            return [ourListObj, ...listsWithoutList]; // возвращаем обновленный лист и все остальные листы
        })
    }

    function changeList(id, newNameForList, newbuyBy, closePopup) {
        setListItems(prevListItems => {
            const listsWithoutList = prevListItems.filter(list => list.idOfList !== id); // Удаляем нужный лист с нужными нам айтемами из списка листов
            const [ourListObj] = prevListItems.filter(list => list.idOfList === id); // Находим нужный нам лист и сразу же destructuring массив из одного объекта
            
            if(newNameForList === "") {
                newNameForList = ourListObj.nameForList; // Проверяем на пустую строку полученное значение нового названия листа и если пустая строка, то подставляем предыдущее значение
            } 
            if(newbuyBy === "") {
                newbuyBy = ourListObj.buyBy; // Проверяем на пустую строку полученное значение нового buyBy и если пустая строка, то подставляем предыдущее значение
            }

            const updateOurListObj = {...ourListObj, nameForList: newNameForList, buyBy: newbuyBy}; // Создаем новый объект для листа с такими же свойствами (как и у предыдущего объекта листа) и в нем обновляем свойства nameForList и buyBy
            console.log(updateOurListObj);
            return [updateOurListObj, ...listsWithoutList]; // Возвращаем обновленный лист и все остальные листы
        })
        closePopup();
    }

    function changeItem(idList, idItem, newNameForItem, newUnits, newExpectedPrice, newNote, closePopup) {
        setListItems(prevListItems => {
            const listsWithoutList = prevListItems.filter(list => list.idOfList !== idList); // Удаляем нужный лист с нужными нам айтемами из списка листов
            const [ourListObj] = prevListItems.filter(list => list.idOfList === idList); // Находим нужный нам лист и сразу же destructuring массив из одного объекта
            const itemsWithoutItem = ourListObj.items.filter(item => item.idOfItem !== idItem); // Удаляем нужный айтем из айтемов в айтемах нужного нам листа
            const [ourItem] = ourListObj.items.filter(item => item.idOfItem === idItem); // Находим нужный айтем из айтемов в айтемах нужного нам листа
            
            console.log(ourItem);

            if(newNameForItem === "") {
                newNameForItem = ourItem.nameForItem; // Проверяем на пустую строку полученное значение нового названия айтема и если пустая строка, то подставляем предыдущее значение
            }
            if(newUnits === "") {
                newUnits = ourItem.units; // Проверяем на пустую строку полученное значение нового units и если пустая строка, то подставляем предыдущее значение
            }
            if(newExpectedPrice === "") {
                newExpectedPrice = ourItem.expectedPrice; // Проверяем на пустую строку полученное значение нового expectedPrice и если пустая строка, то подставляем предыдущее значение
            }
            if(newNote === "") {
                newNote = ourItem.note; // Проверяем на пустую строку полученное значение нового note и если пустая строка, то подставляем предыдущее значение
            }
            
            const ourItemChangeValues = {...ourItem, nameForItem: newNameForItem, units: newUnits, expectedPrice: newExpectedPrice, note: newNote} // Создаем новый объект айтема и в нем используем все те же свойства, но меняем значения свойств nameForItem, units, expectedPrice, note
            const updateItems = [ourItemChangeValues, ...itemsWithoutItem]; // Обновляем свойство с айтемами в нужном нам листе - возвращаем (добавляем) туда обновленный айтем
            const updateOurListObj = {...ourListObj, items: updateItems}; // Создаем новый объект для листа с такими же свойствами (как и у предыдущего объекта листа) и в нем обновляем свойство items
        
            return [updateOurListObj, ...listsWithoutList];
        
        })

        calculateExpectedCostForOneList(idList); // Рассчитываем сумму всех айтемов в листе

        closePopup();
    }

    function calculateExpectedCostForOneList(id) {
        setListItems(prevListItems => {
            const listsWithoutList = prevListItems.filter(list => list.idOfList !== id); // Удаляем нужный лист с нужными нам айтемами из списка листов
            const [ourListObj] = prevListItems.filter(list => list.idOfList === id); // Находим нужный нам лист и сразу же destructuring массив из одного объекта
            const copyOFOurListObj = {...ourListObj}
            
            const takeExpectedPrices = copyOFOurListObj.items.map(item => item.expectedPrice); // Переобходим каждый из айтемов и в новый массив сохраняем значения ожидаемой цены каждого айтема
            
            const takeExpectedPricesRemoveEmptyStrings = takeExpectedPrices.map(el => { // Проверяем каждый элемемент пустую строку, то есть пользователь не заполнил цену и в этом случае возвращаем строку 0
                if(el === "No price set") {
                    return "0";
                } else {
                    return el; // Если заполнил возвращаем элемент
                }
                
            });
            
            const convertExpectedPrices = takeExpectedPricesRemoveEmptyStrings.map(el => parseFloat(el)); // Конвертируем значения из строк в числа и сохраняем в новый массив
            let sum = convertExpectedPrices.reduce((prev, cur) => prev + cur); // Расчитываем сумму всех элементов массива
            if (sum === 0) { // Если пользователь не заполнял поля, то сумма получится 0 и выведем текст, который говорит об этом
                sum = "No price set";
            }
            ourListObj.expectedCost = sum; // Устанавливаем эту сумму для свойства с ожидаемой суммой для нужного нам листа.
            return [ourListObj, ...listsWithoutList];
        })
    }
    
    function dataForVisualisationFunc(id) {
        setListItems(prevListItems => {
            const listsWithoutList = prevListItems.filter(list => list.idOfList !== id); // Удаляем нужный лист с нужными нам айтемами из списка листов
            const [ourListObj] = prevListItems.filter(list => list.idOfList === id); // Находим нужный нам лист и сразу же destructuring массив из одного объекта
 
            const namesOfItemsForChart = ourListObj.items.map(item => item.nameForItem); // Помещаем в массив все имена айтемов
            const pricesOfItemsForChart = ourListObj.items.map(item => parseFloat(item.expectedPrice)); // Помещаем в массив все цены айтемов
            
            const dataForChart = {namesOfItemsForChart: namesOfItemsForChart, pricesOfItemsForChart: pricesOfItemsForChart}; // Группируем в объект массивы с именами и ценами айтемов для более простой передачи
            
            ourListObj.visualisationData = dataForChart; // Сохраняем вышесозданный объект в свойстве visualisationData нужного листа
            return [ourListObj, ...listsWithoutList];
        })
    }


    console.log(listItems);



    return (
        <Context.Provider value={{listItems, setListItems, removeListItem, removeItem, toggleCompleteList, toggleCompleteItem, removeAllLists, removeAllItems, changeList, changeItem, calculateExpectedCostForOneList, dataForVisualisationFunc}}>
            {children}
        </Context.Provider>
    )

}


export {ContextProvider, Context}