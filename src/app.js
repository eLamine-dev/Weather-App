import './assets/reset.css';
import './assets/style.css';
import AppView from './appView';
import fetchApiData from './utils/getApiData';

document.addEventListener('DOMContentLoaded', () => {
   start();
});

async function start() {
   // const promise = await Promise.resolve('async working');

   const appView = new AppView({ location: 'Kyiv' });
   document.body.appendChild(appView);

   const cordinates = await fetchApiData('ferdjioua');
   console.log(cordinates);

   // console.log(promise);
}
