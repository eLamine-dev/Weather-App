import './assets/reset.css';
import './assets/style.css';
import AppView from './appView';
import fetchApiData from './utils/getApiData';

document.addEventListener('DOMContentLoaded', () => {
   start();
});

async function start() {
   // const promise = await Promise.resolve('async working');

   const data = await fetchApiData('ferdjioua');

   const appView = new AppView(data);
   document.body.appendChild(appView);
   // console.log(cordinates);

   // console.log(promise);
}
