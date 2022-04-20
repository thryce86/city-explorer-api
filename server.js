'use strict';
console.log('our first server');

// this library lets us access our .env file
require('dotenv').config();


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

app.get('/weather', (request, response) => {
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
 let forecast = weatherObj.data.map((input) => input.weather);
 console.log(forecast);

  
  let selectedCity = new Weather(weatherObj)  ;

  // response.send(request.query.searchQuery);
  response.send(selectedCity);
  // console.log(request.query.name);
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
class Weather{
  constructor(inObj) {
    console.log('85 in constructor ' + inObj.uv) ;

  this.city_name = inObj.city_name ;
  this.weather   = inObj.data[0].weather   ;
  }
}

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));