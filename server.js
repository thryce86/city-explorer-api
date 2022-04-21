'use strict';
console.log('our first server');

// this library lets us access our .env file
require('dotenv').config();

//to do data requests
const axios = require('axios');

//  data object
let data = require('./data/weather.json');

// express is a server library
const express = require('express');

// initalizes the express library
const app = express();

// library that determines who is allowed to speak to our server
const cors = require('cors');


// this settting says that everyone is allowed to speak to our server
app.use(cors());

// we are getting the port variable from the .env file.
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 3002;
console.log(PORT);

//////////////////////////////////////////////////////////////////////////////////////////////





// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get('/', (request, response) => {
  response.send('hello from the home route');
});



app.get('/xyz', (request, response) => {
  response.send('xyz');
});

app.get('/weather',async  (request, response) => {
  // this will go to the terminal
  console.log('alive') ;
//this will be what you use to pull the key  value down from the browser 
// http://localhost:3001/weather?searchQuery=life
  let searchQuery_city = request.query.searchQuery;
   
  //find the data
  console.log('heya ' + searchQuery_city) ;
  let weatherObj = data.find(input => input.city_name === searchQuery_city) ;




  console.log('57 ' + weatherObj.data);
  // new forecast array send to constructor so i need to break this down somehow 
 let forecastArray = weatherObj.data.map((input,i) =>{
   console.log('map' , input.weather  ,input.valid_date) ;
   return new Forecast(input.weather , input.valid_date )
//  return Forecast;
                       }

 
 );
 console.log(forecastArray);

  
  // let selectedCity = new Weather(weatherObj)  ;

  // response.send(request.query.searchQuery);

////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///lab 08



// I need to parse new input then somehow combine this to forecasts and send the entire thing 
// I dont know how to make that request more specific by lat and lon 
////////////////////////////////////////////////////////////////////////////////
//lab08
// let searchQuery_city = request.query.searchQuery;
let searchQuery_lat = parseFloat(request.query.lat).toFixed(3);
// let searchQuery_lon = parseFloat(request.query.lon).toFixed(3)   ;
console.log('heya ' +  request.query.lon) ;
let start_date = forecastArray[0].date;
let end_date = forecastArray[2].date;
let searchQuery_lon = parseFloat(request.query.lon).toFixed(3)   ;
console.log("date_checker   =  "  +searchQuery_lat , searchQuery_lon ,start_date , end_date ) ;

// add start and end date
//correct call I think #td need to do the call from 
let weatherUrl = `https://api.weatherbit.io/v2.0/history/daily?&lat=${searchQuery_lat}&lon=${request.query.lon}&start_date=${start_date}&end_date=${end_date}&key=${process.env.WEATHER_API_KEY}` ;
//test call
//  let weatherUrl = `https://api.weatherbit.io/v2.0/history/daily?&lat=38.123&lon=-78.543&start_date=2022-04-17&end_date=2022-04-18&key=${process.env.WEATHER_API_KEY}` ;

 // lat=48.858   lon=,2.3200 
// let weatherUrl = `https://api.weatherbit.io/v2.0/history/daily?&lat=48.858&lon=2.320&start_date=2022-04-17&end_date=2022-04-18&key=${process.env.WEATHER_API_KEY}` ;

console.log(weatherUrl) ;
// console.log(weatherUrl) ; 

let weatherDataTemp = await axios.get(weatherUrl);




console.log('data from weaher: ' +  weatherDataTemp.data ) ;
// console.log('data from weaher: ' )





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







  // response.send(forecastArray);
  // console.log(forecastArray );
  response.send(weatherDataTemp.data) ;
});


// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// at the bottom of all our routes:
app.get('*', (request, response) => {
  response.send('Not sure what you are a looking for, but it isn\'t here.');
});


//CLASSES
class Forecast{
  constructor(inWeather ,  inDate) {
    console.log('85 in constructor ' + inWeather.description) ;

  this.date = inDate ;
   this.description   = inWeather.description  ;
  }
}


// class OutputObj{
//   constructor(windObj , forecastArray){

//     // get the wind data

//     // format the forecast data into everything 

//     // return 
//     // {
//     //   "description": "Low of 17.1, high of 23.6 with broken clouds",
//     //   "date": "2021-03-31"
//     // }, 

    



//   }
// }

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));