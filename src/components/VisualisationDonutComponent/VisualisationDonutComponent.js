import {Pie} from 'react-chartjs-2';

import './VisualisationDonutComponent.css';

function VisualisationDonutComponent({closeVisualisationDonut, visualisationData}) {
      
    const namesOfItemsForChart = visualisationData.namesOfItemsForChart; // Получаем массив с названиями айтемов
    const pricesOfItemsForChart = visualisationData.pricesOfItemsForChart; // Получаем массив с ценами айтемов


    const state = {
        labels: namesOfItemsForChart,
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
            ],
            data: pricesOfItemsForChart
          }
        ]
      }


    return (
        <div className="visualisation-donut-block">
            <div onClick={closeVisualisationDonut} className="close-popup-window-donut">
                <span>X</span>
            </div>
            <div className="visualisation-donut-container">
              
              <Pie
                data={state}
                options={{
                  title:{
                    display:true,
                    text:'Visulization Of Expenses',
                    fontSize:20
                  },
                  legend:{
                    display:true,
                    position:'right'
                  }
                }}
              />
      
            </div>
            
        </div>        
    )
}

export default VisualisationDonutComponent;