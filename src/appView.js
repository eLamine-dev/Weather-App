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
               <form class="location-search">
                  <input type="text" />
                  <button type="submit"></button>
               </form>

               <div class="time-date-info">
                  <div class="time">10:00</div>
                  <div class="date">16/2/2024</div>
               </div>
               <div class="today-weather">
                  <div class="location">Now in ${data.location}</div>
                  <div class="wether-summary">It is chilly today</div>
                  <div class="temperature"></div>
               </div>
            </div>
            <div class="side-info">
               <div class="days-forecast"></div>
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
            <div class="days-forecast"></div>
         </div>
      `;
   }
}

customElements.define('app-view', AppView);

export default AppView;
