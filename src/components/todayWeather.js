class TodayWeather extends HTMLElement {
   constructor(data) {
      super();
      this.render(data);
   }

   render(data) {
      this.innerHTML = html` <div class="location">Now in ${data.location}</div>
         <div class="wether-summary">
            <div class="icon"></div>
            <div class="summary">${data.summary}</div>
         </div>
         <div class="temperature"></div>
         <div class="feels-like"></div>`;
   }
}

customElements.define('today-weather', TodayWeather);

export default TodayWeather;
