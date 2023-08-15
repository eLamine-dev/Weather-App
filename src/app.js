import './assets/reset.css';
import './assets/style.css';
import TodayWeather from './components/todayWeather';

function start() {
   // const promise = await Promise.resolve('async working');

   const weather = new TodayWeather({ location: 'Kyiv' });
   document.body.appendChild(weather);

   // console.log(promise);
}

start();
