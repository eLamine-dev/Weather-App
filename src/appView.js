// const template = document.createElement('template');
// template.innerHTML = html`
//    <div class="main-section"></div>
//    <div class="side-info"></div>
// `;

import { format } from 'date-fns';

class AppView extends HTMLElement {
   constructor(data) {
      super();
      this.render(data);
      // this.appendChild(template.content.cloneNode(true));
   }

   render(data) {
      this.innerHTML = `
         <div class="main-section">
            <div class="logo">Weather</div>
            <div class="time-date-info"></div>
            <form class="search-bar">
               <input
                  type="text"
                  class="search-input"
                  placeholder="Search City..."
               />
               <button type="submit"><i class="fas fa-search"></i></button>
            </form>
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
               <div class="wind">
                  <div class="wind-speed">${data.today.wind_speed} km/h</div>
                  <div class="wind-direction">${data.today.wind_deg}</div>

                  <div class="compass">
                     <div class="arrows"></div>
                     <div class="dt-n-s"></div>
                     <div class="dt-w-e"></div>
                  </div>
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
}

customElements.define('app-view', AppView);

export default AppView;
