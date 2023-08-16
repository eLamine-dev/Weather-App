import './assets/reset.css';
import './assets/style.css';
// import TodayWeather from './components/todayWeather';
import AppView from './appView';

function start() {
   // const promise = await Promise.resolve('async working');

   const appView = new AppView({ location: 'Kyiv' });
   document.body.appendChild(appView);

   // console.log(promise);
}

start();
