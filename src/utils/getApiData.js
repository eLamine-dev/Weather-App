export async function fetchApiData(location) {
   const coordinates = await getLocationCoordinates(location);
   const weatherData = await getApiWeatherData(coordinates);

   return weatherData;
}

async function getLocationCoordinates(location) {
   const coordinates = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=163a88340501cc3338e7b7a9919e470f`
   );

   const coordinatesJson = await coordinates.json();
   return coordinatesJson[0];
}

async function getApiWeatherData(coordinates) {
   const apiData = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&unites=metric&appid=163a88340501cc3338e7b7a9919e470f`
   );

   const apiDataJson = await apiData.json();
   return apiDataJson;
}
