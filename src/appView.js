import { format } from 'date-fns';

class AppView extends HTMLElement {
   constructor(data) {
      super();
      this.data = data;

      this.render(this.data);
   }

   connectedCallback() {
      this.createHourlyChart();
   }

   render(data) {
      this.innerHTML = `
         <div class="main-section">
            <div class="main-section-header">
               <div class="logo">Weather</div>
               <div class="time-date-info"></div>
            </div>

            <div class="weather-now">
               <div class="location">
                  Today in ${data.location.name}, ${data.location.country}
               </div>
               <div class="temperature">${data.current.temp}°C</div>
               <div class="real-feel">${data.current.feels_like}°C</div>
               <div class="humidity">${data.current.humidity}%</div>
               <div class="wether-summary">${data.today.summary}</div>
            </div>
         </div>
         <div class="side-info">
            <form class="search-bar">
               <input
                  type="text"
                  class="search-input"
                  placeholder="Search City..."
               />
               <button type="submit"><i class="fas fa-search"></i></button>
            </form>
            <div class="days-forecast"></div>
            <div class="sun-times">
               <div class="sunrise">
                  <div class="title">Sunrise</div>
                  <div class="value">${data.today.sunrise}</div>
               </div>
               <div class="sunset">
                  <div class="title">Sunset</div>
                  <div class="value">${data.today.sunset}</div>
               </div>
            </div>
            <div class="extra-data">
               <div class="extra-data-item humidity">
                  <div class="title">Humidity</div>

                  <div class="value">${data.today.humidity}%</div>
               </div>
               <div class="extra-data-item real-feel">
                  <div class="title">Real Feel</div>
                  <div class="value">${data.today.feels_like}°C</div>
               </div>
               <div class="extra-data-item uv">
                  <div class="title">UV Index</div>
                  <div class="value">${data.today.uvi}</div>
               </div>
               <div class="extra-data-item pressure">
                  <div class="title">Pressure</div>
                  <div class="value">${data.today.pressure} mbar</div>
               </div>
               <div class="extra-data-item precipitation">
                  <div class="title">Precipitation</div>
                  <div class="value">${data.today.precipitation}%</div>
               </div>
            </div>
            <div class="wind">
               <div class="wind-speed">${data.today.wind_speed} km/h</div>
               <div class="wind-direction">
                  <div class="compass">
                     <div class="arrows"></div>
                     <div class="dt-n-s"></div>
                     <div class="dt-w-e"></div>
                  </div>
               </div>
            </div>
            <div id="chart-container"></div>
         </div>
      `;

      data.daily.forEach((day) => {
         const dayView = document.createElement('div');
         dayView.classList.add('forecast-day');
         dayView.innerHTML = `
            <img
               class="day-icon"
               src="https://openweathermap.org/img/wn/${day.icon}.png"
               alt=""
               srcset=""
            />
            <div class="day-name">${day.name}</div>
            <div class="day-temp-max">${day.temp.max}</div>
            <div>/</div>
            <div class="day-temp-min">${day.temp.min}</div>
         `;

         this.querySelector('.days-forecast').appendChild(dayView);
      });

      this.updateTimeDate();

      this.querySelector(
         '.compass .arrows'
      ).style.transform = `rotate(${data.today.wind_deg}deg)`;
   }

   updateTimeDate() {
      const dateInfo = new Date();

      const time = format(dateInfo, 'hh:mm aa');
      const date = format(dateInfo, 'eeee, dd MMM yyyy');

      const timeDateWrapper = this.querySelector('.time-date-info');
      timeDateWrapper.innerHTML = `<div class="time">${time}</div>
         <div class="date">${date}</div>`;

      setTimeout(this.updateTimeDate.bind(this), 6000);
   }

   createHourlyChart() {
      const hourlyChart = document.createElement('canvas');
      const chart = new Chart(hourlyChart, {
         type: 'line',
         data: {
            labels: this.data.hourly.hours,
            datasets: [
               {
                  fill: false,
                  lineTension: 0,
                  backgroundColor: 'rgba(0,0,255,1.0)',
                  borderColor: 'rgba(0,0,255,0.1)',
                  data: this.data.hourly.temperatures,
               },
            ],
         },
         options: {
            legend: { display: false },
            scales: {
               yAxes: [
                  {
                     display: false,
                     ticks: {
                        min: Math.min(...this.data.hourly.temperatures) - 7,
                        max: Math.max(...this.data.hourly.temperatures) + 7,
                     },
                  },
               ],
            },
            animation: {
               duration: 1,
               onComplete() {
                  const chartInstance = this.chart;
                  const { ctx } = chartInstance;
                  ctx.font = Chart.helpers.fontString(
                     Chart.defaults.global.defaultFontSize,
                     Chart.defaults.global.defaultFontStyle,
                     Chart.defaults.global.defaultFontFamily
                  );
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';

                  this.data.datasets.forEach((dataset, i) => {
                     const meta = chartInstance.controller.getDatasetMeta(i);
                     meta.data.forEach((bar, index) => {
                        const data = dataset.data[index];
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                     });
                  });
               },
            },
         },
      });

      this.querySelector('#chart-container').appendChild(hourlyChart);
   }
}

customElements.define('app-view', AppView);

export default AppView;
