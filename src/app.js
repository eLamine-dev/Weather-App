import './assets/reset.css';
import './assets/style.css';
import AppView from './appView';
import fetchApiData from './utils/getApiData';
import updateBackground from './utils/updateBackground';
import { hideLoadingSpinner, showLoadingSpinner } from './utils/loadingSpinner';

async function displayApp(location) {
   const body = document.querySelector('body');

   const data = await fetchApiData(location);
   const appView = new AppView(data);
   const oldView = document.querySelector('app-view');
   if (oldView) oldView.remove();
   updateBackground(data.current);
   hideLoadingSpinner();
   body.appendChild(appView);
   addEventListeners();
}

function addEventListeners() {
   const searchForm = document.querySelector('form');
   searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchValue = document.querySelector('.search-input').value;
      displayApp(searchValue);
   });
}

document.addEventListener('DOMContentLoaded', () => {
   showLoadingSpinner();
   displayApp('Algiers');
});
