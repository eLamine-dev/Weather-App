import '../assets/images/Clear-day.jpg';
import '../assets/images/Clear-night.jpg';
import '../assets/images/Clouds-day.jpg';
import '../assets/images/Clouds-night.jpg';
import '../assets/images/Drizzle-day.jpg';
import '../assets/images/Drizzle-night.jpg';
import '../assets/images/Mist-day.jpg';
import '../assets/images/Mist-night.jpg';
import '../assets/images/Rain-day.jpg';
import '../assets/images/Rain-night.jpg';
import '../assets/images/Snow-day.jpg';
import '../assets/images/Snow-night.jpg';
import '../assets/images/Thunderstorm-day.jpg';
import '../assets/images/Thunderstorm-night.jpg';

export default function updateBackground(data) {
   const body = document.querySelector('body');

   if (data.icon === '50d' || data.icon === '50n') {
      body.style.background = `url('Mist-${data.dayTime}.jpg') no-repeat center center fixed`;
   } else {
      body.style.background = `url('${data.main}-${data.dayTime}.jpg') no-repeat center center fixed`;
   }
}
