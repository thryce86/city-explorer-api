'use strict';

let cache = require('./cache.js');
const axios = require('axios');
const cors = require('cors');


// module.exports = getWeather;

async function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  console.log ('key = ', key ); 
  console.log (`http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`);

  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {

             
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
    .then(response => parseWeather(response.data));
  
    console.log('Cache miss');
       
    

    
    // console.log('getWeather   response.data ' , response.data ) ;
  }
  

  console.log('getWeather ELSE   hey = ',key , '    cache[key].timestamp = ', cache[key].timestamp , 'cache[key].data  = ', cache[key].data);
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
console.log('++++++++++++ in Class Weather ')

    this.forecast = day.weather.description;
    this.date = day.datetime;

    console.log(  this.forecast = day.weather.description) ;
  }
}


module.exports = getWeather;