'use strict';

// console.log('our first server');

// this library lets us access our .env file
require('dotenv').config();

//to do data requests
const axios = require('axios');

//  data object
// let data = require('./data/weather.json');

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
// console.log(PORT);

//////////////////////////////////////////////////////////////////////////////////////////////





// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get('/', (request, response) => {
  response.send('hello from the home route');
});



app.get('/xyz', (request, response) => {
  response.send('xyz');
});



app.get('/movies', async (request, response, next) => {


  try {
    let searchQuery_city = request.query.city;
    // console.log('in movies  ' +searchQuery_city);
    //https://api.themoviedb.org/3/movie/76341?api_key=d996aca02895711741e6ac950089a3f9
    // https://api.themoviedb.org/3/search/keyword?query=*Summer*&api_key=d996aca02895711741e6ac950089a3f9
    // searches title https://api.themoviedb.org/3/search/movie?query=*Summer*&api_key=d996aca02895711741e6ac950089a3f9

    let movieUrl = `https://api.themoviedb.org/3/search/movie?query=*${searchQuery_city}*&api_key=${process.env.MOVIE_API_KEY}`;
    // console.log(movieUrl);
    let movieDataFull = await axios.get(movieUrl);
    // console.log(movieDataFull.data) ;
    // let beginningUrl = 'https://image.tmdb.org/t/p/w500';

    //used when it was a grand list no titles 
    // let output = new MovieObj(movieDataFull.data);
    // console.log(movieDataFull.data.results) ;

    let output = movieDataFull.data.results.map((inputObj) => new MovieObj(inputObj));
    // console.log(output) ;



    response.status(200).send(output);

  } catch (error) {
    next(error);
  }







});




app.get('/weather', async (request, response) => {


  let searchQuery_lat = parseFloat(request.query.lat).toFixed(3);
  let searchQuery_lon = parseFloat(request.query.lon).toFixed(3);
  // console.log('heya ' +  request.query.lat) ;





  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.searchQuery}&key=${process.env.WEATHER_API_KEY}`;
  // console.log(weatherUrl) ;
  // console.log(weatherUrl) ; 

  let weatherDataTemp = await axios.get(weatherUrl);

  let output = new OutputObj(weatherDataTemp.data.data);


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







  // this returns an updated output with combined description using the weather io  
  response.send(output);

});





//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// at the bottom of all our routes:
app.get('*', (request, response) => {
  response.send('Not sure what you are a looking for, but it isn\'t here.');
});


//CLASSES
class MovieObj {
  constructor(inputObj) {

    // console.log('in MovieObj')  ;
    // console.log(inputObj);
    // console.log("+++++++++++++++++++++++++++++++++++" + inputObj) ;

    let beginningUrl = 'https://image.tmdb.org/t/p/w500';

    // console.log("+++++++++++++++++++++++++++++++++++" + inputObj.results.slice(0,19)) ;

    // inputObj =inputObj.results.slice(0,20) ;
    // console.log("+++++++++++++++++++++++++++++++++++" + inputObj) ;

    this.title = inputObj.original_title;
    this.overview = inputObj.overview;
    this.total_votes = inputObj.vote_count;
    this.image_url = beginningUrl + inputObj.poster_path;
    this.popularity = inputObj.vote_average;
    this.release_date = inputObj.release_date;

    // console.log(this.description) ;




    // let output=inputObj.map((inputObj) => {
    //   let title = inputObj.original_title;
    //   let overview = inputObj.overview;
    //   let total_votes = inputObj.vote_count ;
    //   let image_url = beginningUrl +inputObj.poster_path;
    //   let popularity = inputObj.vote_average ;
    //   let release_date =inputObj.release_date;

    //   return [title ,overview, total_votes ,popularity ,image_url, release_date] ;
    // });  
    // console.log(output);
    // return(output) ;

  }
}




class Forecast {
  constructor(inWeather, inDate) {
    // console.log('85 in constructor ' + inWeather.description) ;

    this.date = inDate;
    this.description = inWeather;
  }
}


class OutputObj {
  constructor(windObj) {


    //  console.log('////////////////////////////////////////////////////////////////////////' );


    // ourput of forecast objects
    let output = windObj.map((tempObj) => {
      let weather_desctription = tempObj.weather.description;
      // console.log( tempObj.weather.description ) ;
      let min_temp = tempObj.low_temp;
      let max_temp = tempObj.max_temp;
      let date = tempObj.valid_date;
      let description_str = `Low of ${min_temp}, high of ${max_temp} with ${weather_desctription.toLowerCase()}`;

      // console.log(description_str) ;

      let out = new Forecast(description_str, date)
      return (out);
      // return(weather_desctription);
    });

    // console.log('OUTPUT WIND CLASS    ' + output) ;

    return (output);

  }


}




// ERRORS
// Handle any errors
app.use((error, request, response, next) => {

  // response.status(500).send(error.message);
  response.status(500).send('ERROR!!!!!');

});




// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));