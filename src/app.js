import './assets/reset.css';
import './assets/style.css';
import AppView from './appView';
import fetchApiData from './utils/getApiData';
import updateBackground from './utils/updateBackground';
// import './assets/images/scattered clouds.jpg';

document.addEventListener('DOMContentLoaded', () => {
   displayApp('British Columbia');
});

function addEventListeners() {
   const searchForm = document.querySelector('form');
   searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchValue = document.querySelector('.search-input').value;

      displayApp(searchValue);
   });
}

async function displayApp(location) {
   const body = document.querySelector('body');
   showLoadingSpinner();
   const data = await fetchApiData(location);
   const appView = new AppView(data);

   const oldView = document.querySelector('app-view');

   if (oldView) oldView.remove();

   updateBackground(data.current);
   hideLoadingSpinner();
   body.appendChild(appView);
   addEventListeners();
}

function hideLoadingSpinner() {
   if (document.querySelector('.loading-spinner')) {
      document.querySelector('.loading-spinner').remove();
   }
}

function showLoadingSpinner() {
   const loadingSpinner = document.createElement('div');
   loadingSpinner.innerHTML = `
      <div class="sp sp-circle"></div>
   `;
   loadingSpinner.classList.add('loading-spinner');
   if (document.querySelector('app-view')) {
      document.querySelector('form').appendChild(loadingSpinner);
   } else {
      document.querySelector('body').appendChild(loadingSpinner);
   }
}
