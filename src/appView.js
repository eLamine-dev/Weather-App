// const template = document.createElement('template');
// template.innerHTML = html`
//    <div class="main-section"></div>
//    <div class="side-info"></div>
// `;

class AppView extends HTMLElement {
   constructor(data) {
      super();
      this.render(data);
      // this.appendChild(template.content.cloneNode(true));
   }

   render(data) {
      this.innerHTML = `
         <div class="app-wrapper">
            <div class="main-section">
               <div class="logo">Weather</div>
               <div class="time-date-info">
                  <div class="time">10:00</div>
                  <div class="date">16/2/2024</div>
               </div>
               <form class="location-search">
                  <input type="text" />
                  <button type="submit"></button>
               </form>
               <div class="weather-now">
                  <div class="location">Today in ${data.location.name}, ${data.location.country}</div>
                  <div class="temperature">${data.current.temp}°C</div></div>
                  <div class="real-feel">${data.current.feels_like}°C</div>
                  <div class="humidity">${data.current.humidity}%</div>
                  <div class="wether-summary">${data.today.summary}</div>
               </div>
            </div>
            <div class="side-info">
               <div class="days-forecast">
               </div>
               <div class="sun-times">
                  <div class="sunrise">Sunrise ${data.today.sunrise}</div>
                  <div class="sunset">sunset ${data.today.sunset}</div>
               </div>
               <div class="today-extra">
                  <div class="humidity">${data.today.humidity}%</div>
                  <div class="real-feel">40</div>
                  <div class="uv">7</div>
                  <div class="pressure">1032 mbar</div>
                  <div class="rain-chance">20%</div>
               </div>
               <div class="wind"></div>
            </div>
         </div>
      `;

      data.daily.forEach((day) => {
         const dayView = document.createElement('div');
         dayView.classList.add('day-view');
         dayView.innerHTML = `
            <img
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
   }
}

customElements.define('app-view', AppView);

export default AppView;
