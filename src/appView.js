const { utcToZonedTime, format } = require('date-fns-tz');
import fixTimeZone from './utils/fixTimeZone';

class AppView extends HTMLElement {
   constructor(data) {
      super();
      this.data = data;
      console.log(data);
      this.render(this.data);
   }

   connectedCallback() {
      this.createHourlyChart();
   }

   render(data) {
      this.innerHTML = `
         <div class="main-section">
            <div class="main-section-header">
               <div class="logo">
                  <a href="http://https://github.com/eLamine-dev/Weather-App"
                     >TopWeather.</a
                  >
               </div>
               <form class="search-bar">
                  <input
                     type="text"
                     class="search-input"
                     placeholder="Search City..."
                  />
                  <button type="submit"><i class="fas fa-search"></i></button>
               </form>
            </div>
            <div class="time-date-info"></div>

            <div class="weather-now">
               <div class="location">
                  Today in ${data.location.name}, ${data.location.country}
               </div>
               <div class="weather-summary">${data.today.summary}</div>
               <div class="current-data">
                  <div class="current-temp">${data.current.temp}°</div>

                  <div class="current-humidity">
                     <i class="fa-solid fa-droplet"></i>
                     <div>${data.current.humidity}%</div>
                  </div>
                  <div class="current-real-feel">
                     <i class="fa-solid fa-person"></i>
                     <div>${data.current.feels_like}°</div>
                  </div>
                  <div class="current-weather-description">
                     <img
                        class="current-icon"
                        src="https://openweathermap.org/img/wn/${
                           data.current.icon
                        }.png"
                        alt=""
                        srcset=""
                     />
                     <div>${data.current.main}</div>
                  </div>
               </div>
            </div>
         </div>
         <div class="side-info">
            <div class="days-forecast">
               <div class="title">
                  <i class="fa-solid fa-calendar-week"></i> 7 days forecast
               </div>
            </div>
            <div class="extra-container">
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
               <div class="sun-times">
                  <div class="sunrise">
                     <div class="title">Sunrise</div>
                     <div class="value">
                        ${format(data.today.sunrise, 'kk:mm')}
                     </div>
                  </div>
                  <div class="sunset">
                     <div class="title">Sunset</div>
                     <div class="value">
                        ${format(data.today.sunset, 'kk:mm')}
                     </div>
                  </div>
               </div>
               <div class="wind">
                  <div class="text">
                     <div class="title">Wind</div>
                     <div class="wind-speed">${data.today.wind_speed}km/h</div>
                  </div>

                  <div class="wind-direction">
                     <div class="compass">
                        <div class="arrows"></div>
                        <div class="dt-n-s"></div>
                        <div class="dt-w-e"></div>
                     </div>
                  </div>
               </div>
            </div>

            <div id="chart-container">
               <div class="title">
                  <i class="fa-solid fa-clock"></i> 24-hour forecast
               </div>
            </div>
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
            <div class="day-weather">${day.main}</div>
            <div class="day-temp-max">${day.temp.max} / ${day.temp.min}</div>
         `;

         this.querySelector('.days-forecast').appendChild(dayView);
      });

      this.updateTimeDate();

      this.querySelector(
         '.compass .arrows'
      ).style.transform = `rotate(${data.today.wind_deg}deg)`;
   }

   updateTimeDate() {
      const zonedDate = fixTimeZone(new Date(), this.data.location.timezone);
      const time = format(zonedDate, 'hh:mm aa', {
         timeZone: this.data.location.timezone,
      });
      const date = format(zonedDate, 'eeee, dd MMM yyyy', {
         timeZone: this.data.location.timezone,
      });

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
                  backgroundColor: 'white',
                  borderColor: '#bae5fd20',

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
                     gridLines: {
                        borderColor: '#bae5fd20',
                     },

                     ticks: {
                        min: Math.min(...this.data.hourly.temperatures) - 7,
                        max: Math.max(...this.data.hourly.temperatures) + 7,
                     },
                  },
               ],
               xAxes: [
                  {
                     ticks: {
                        fontColor: 'white',
                     },
                     gridLines: {
                        drawBorder: false,
                        display: true,
                        color: '#bae5fd20',
                        padding: 20,
                        borderColor: '#bae5fd20',
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
