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
               <input type="text" class="textbox" placeholder="Search City..." />
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
               <div class="sunrise">Sunrise ${data.today.sunrise}</div>
               <div class="sunset">sunset ${data.today.sunset}</div>
            </div>
            <div class="today-extra">
               <div class="humidity">humidity ${data.today.humidity}%</div>
               <div class="real-feel"></div>
               <div class="uv">${data.today.uvi}</div>
               <div class="pressure">${data.today.pressure} mbar</div>
               <div class="precipitation">${data.today.precipitation}%</div>
            </div>
            <div class="wind">
               <div class="wind-speed">${data.today.wind_speed} km/h</div>
               <div class="wind-direction">${data.today.wind_deg}</div>
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
