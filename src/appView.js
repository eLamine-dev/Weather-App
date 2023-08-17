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
      this.innerHTML = html`
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
                  <div class="location">Now in ${data.location}</div>
                  <div class="temperature">42</div>
                  <div class="wether-summary">It is chilly today</div>
               </div>
            </div>
            <div class="side-info">
               <div class="days-forecast">
                  <div class="day-info">
                     <div class="day-name">Monday</div>
                     <div class="day-temp">20</div>
                  </div>
                  <div class="day-info">
                     <div class="day-name">Tuesday</div>
                     <div class="day-temp">20</div>
                  </div>
               </div>
               <div class="sun-times">
                  <div class="sunrise">Sunrise 05:00</div>
                  <div class="sunset">sunset 19:00</div>
               </div>
               <div class="today-extra">
                  <div class="humidity">17</div>
                  <div class="real-feel">40</div>
                  <div class="uv">7</div>
                  <div class="pressure">1032 mbar</div>
                  <div class="rain-chance">20%</div>
               </div>
               <div class="wind"></div>
            </div>
         </div>
      `;
   }
}

customElements.define('app-view', AppView);

export default AppView;
