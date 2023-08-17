import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';

export async function fetchApiData(location) {
   const coordinates = await getLocationCoordinates(location);
   const currentWeatherData = await getApiWeatherData(coordinates);
   const yesterdayweatherData = await getYesterdayWeatherData(coordinates);

   const apiData = Object.assign(currentWeatherData, {
      yesterday: yesterdayweatherData,
   });

   return apiData;
}

async function getLocationCoordinates(location) {
   const coordinates = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=163a88340501cc3338e7b7a9919e470f`
   );

   const coordinatesJson = await coordinates.json();
   return coordinatesJson[0];
}

async function getYesterdayWeatherData(coordinates) {
   const yesterday = new Date().setDate(new Date().getDate());
   const formattedYesterday = format(yesterday, 'yyyy-MM-dd');
   console.log(yesterday);
   const apiData = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${coordinates.lat}&lon=${coordinates.lon}&date=${formattedYesterday}&units=metric&appid=163a88340501cc3338e7b7a9919e470f`
   );

   const apiDataJson = await apiData.json();
   return apiDataJson;
}

async function getApiWeatherData(coordinates) {
   const apiData = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=163a88340501cc3338e7b7a9919e470f`
   );

   const apiDataJson = await apiData.json();
   return apiDataJson;
}

function processFetchedData(apiData) {
   const prossedData = {
      current: {
         temp: apiData.current.temp,
         feels_like: apiData.current.feels_like,
         humidity: apiData.current.humidity,
         wind_speed: apiData.current.wind_speed,
         weather_description: apiData.current.weather[0].description,
      },
   };
}
