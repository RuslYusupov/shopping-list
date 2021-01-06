import {Switch, Route} from 'react-router-dom';

import './App.css';
import Header from "./components/Header/Header";
import ShoppingLists from "./components/ShoppingLists/ShoppingLists";
import BuyItems from "./components/BuyItems/BuyItems";


function App() {
  return (
    <div>
        <div className="main-container">
          <Header />

          <Switch>
            <Route exact path="/">
              <ShoppingLists />
            </Route>
            <Route path="/:listId">
              <BuyItems />
            </Route>
          </Switch>

          
      </div>
    </div>
  );
}

export default App;

/* 

Реализовать список покупок.
Предполагается управление:
Добавление, удаление, фильтрация, отображение, пометка прочитанными, навешивание ярлыков, сортировка списка, работа с несколькими списками покупок.
Опционально Drag-n-Drop, Визуализация расходов, ну и любые другие крутые штуки.

 



1) Сверстать адаптив



не буду делать:
Drag Drop - не получилось
Для айтемов также можно сделать сортировку с тем есть ли заметка или нет.
А также для айтемов можно сделать фильтрацию показывать айтемы только с заметками. Или доп фильтр заметка + выполненые, заметка + не выполненные, заметка + все. То есть добавлять или же переписывать варианты


   
https://dribbble.com/shots/3769164-Shopping-List-UI-kit
https://dribbble.com/shots/6974259-Shopping-List-for-Tappsk
https://dribbble.com/shots/11960476-Shopping-List-App
https://dribbble.com/shots/6986983-Shopping-list
https://dribbble.com/shots/11610076-Shopping-List-App
https://www.behance.net/gallery/95092267/Mobile-App?tracking_source=search_projects_recommended%7CShopping%20List
https://www.behance.net/gallery/100676041/Simple-shopping-list-Neumorphic-concept?tracking_source=search_projects_recommended%7CShopping%20List

*/
