import './assets/reset.css';
import './assets/style.css';
import AppView from './appView';
import fetchApiData from './utils/getApiData';
// import './assets/images/scattered clouds.jpg';

document.addEventListener('DOMContentLoaded', () => {
   displayApp('London');
});

function addEventListeners() {
   document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const searchValue = document.querySelector('.search-input').value;

      displayApp(searchValue);
   });
}

async function displayApp(location) {
   const data = await fetchApiData(location);
   const appView = new AppView(data);
   if (document.querySelector('app-view')) {
      document.querySelector('app-view').remove();
   }

   // document.querySelector(
   //    'body'
   // ).style.background = `url('${data.current.description}.jpg') no-repeat center center fixed`;

   document.body.appendChild(appView);
   addEventListeners();
}
