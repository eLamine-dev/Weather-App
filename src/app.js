import './assets/reset.css';
import './assets/style.css';
import AppView from './appView';
import getWeatherData from './utils/getApiData';
import updateBackground from './utils/updateBackground';
import { hideLoadingSpinner, showLoadingSpinner } from './utils/loadingSpinner';
import handleError from './utils/handleError';

async function displayApp(location) {
   const body = document.querySelector('body');
   showLoadingSpinner();

   try {
      const data = await getWeatherData(location);
      const appView = new AppView(data);
      const oldView = document.querySelector('app-view');
      if (oldView) oldView.remove();
      updateBackground(data.current);
      body.appendChild(appView);
      addEventListeners();
   } catch (error) {
      handleError(error);
   }

   hideLoadingSpinner();
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
   displayApp('Algiers');
});
