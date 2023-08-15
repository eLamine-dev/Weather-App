const template = /*html*/ `
      <div class="location">Now in London</div>
      <div class="wether-summary"></div>
      <div class="temperature"></div>
`;

class TodayWeather extends HTMLElement {
   constructor() {
      super();
      this.innerHTML = template;
   }

   connectedCallback() {}
}

customElements.define('today-weather', TodayWeather);

export default TodayWeather;
