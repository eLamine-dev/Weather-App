import { format, fromUnixTime, isToday, isTomorrow } from 'date-fns';

const { utcToZonedTime } = require('date-fns-tz');

const API_KEY = '163a88340501cc3338e7b7a9919e470f';

export default async function getWeatherData(location) {
   const cityData = await fetchLocationCoordinates(location);

   const weatherData = await fetchApiWeatherData(cityData);

   const data = processFetchedData(cityData, weatherData);

   return data;
}

async function fetchLocationCoordinates(location) {
   const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`,
      { mode: 'cors' }
   );

   if (!response.ok) {
      throw new Error('location not found');
   }

   const responseJson = await response.json();

   return responseJson;
}

async function fetchApiWeatherData(cityData) {
   const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&units=metric&exclude=alerts,minutely&appid=${API_KEY}`,
      { mode: 'cors' }
   );

   if (!response.ok) {
      throw new Error(`Server not available`);
   }

   const responseJson = await response.json();

   return responseJson;
}

function processFetchedData(cityData, weatherData) {
   const processedData = {
      location: {
         name: cityData.name,
         country: cityData.sys.country,
         timezone: weatherData.timezone,
      },
      current: {
         temp: Math.round(weatherData.current.temp),
         feels_like: Math.round(weatherData.current.feels_like),
         humidity: weatherData.current.humidity,
         icon: weatherData.current.weather[0].icon,
         main: weatherData.current.weather[0].main,
         description: weatherData.current.weather[0].description,
      },

      today: {
         humidity: Math.round(weatherData.daily[0].humidity),
         wind_speed: weatherData.daily[0].wind_speed,
         wind_deg: weatherData.daily[0].wind_deg,
         sunrise: utcToZonedTime(
            fromUnixTime(weatherData.daily[0].sunrise),
            weatherData.timezone
         ),
         sunset: utcToZonedTime(
            fromUnixTime(weatherData.daily[0].sunset),
            weatherData.timezone
         ),
         pressure: weatherData.daily[0].pressure,
         uvi: weatherData.daily[0].uvi,
         precipitation: Math.round(weatherData.daily[0].pop * 100),
         summary: weatherData.daily[0].summary,
         feels_like: Math.round(weatherData.daily[0].feels_like.day),
      },

      daily: [],

      hourly: { hours: [], temperatures: [] },
   };

   const timeNow = utcToZonedTime(new Date(), weatherData.timezone);

   if (
      timeNow.getTime() < processedData.today.sunset.getTime() &&
      timeNow.getTime() > processedData.today.sunrise.getTime()
   ) {
      processedData.current.dayTime = 'day';
   } else {
      processedData.current.dayTime = 'night';
   }

   for (let i = 0; i < 7; i++) {
      const day = fromUnixTime(weatherData.daily[i].dt);
      const dayData = {
         icon: weatherData.daily[i].weather[0].icon,
         main: weatherData.daily[i].weather[0].main,
         temp: {
            max: Math.round(weatherData.daily[i].temp.max),
            min: Math.round(weatherData.daily[i].temp.min),
         },
      };

      if (isToday(day)) {
         dayData.name = 'Today';
      } else if (isTomorrow(day)) {
         dayData.name = 'Tomorrow';
      } else {
         dayData.name = format(day, 'EEEE');
      }
      processedData.daily.push(dayData);
   }

   for (let i = 0; i <= 24; i += 3) {
      if (i === 0) {
         processedData.hourly.hours.push('Now');
      } else {
         processedData.hourly.hours.push(
            format(
               utcToZonedTime(
                  fromUnixTime(weatherData.hourly[i].dt),
                  weatherData.timezone
               ),
               'kk:mm',
               {
                  timeZone: processedData.location.timezone,
               }
            )
         );
      }

      processedData.hourly.temperatures.push(
         Math.round(weatherData.hourly[i].temp)
      );
   }

   return processedData;
}
