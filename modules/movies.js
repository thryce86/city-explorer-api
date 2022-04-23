'use strict';

let cache = require('./cache_movies.js');
const axios = require('axios');
const cors = require('cors');



async function getMovies(city) {
      const key = 'movie-' + city;
      let searchQuery_city =city ;
      console.log ('key = ', key ); 
    

      // const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;
      let url = `https://api.themoviedb.org/3/search/movie?query=*${searchQuery_city}*&api_key=${process.env.MOVIE_API_KEY}`;
     
                //////////////////////////
                  console.log(url);
                  console.log(cache[key]) ;
                  let tempData =   await axios.get(url) ;
                  // console.log(tempData.data);
                  ///////////////////////////
      
      if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
      } 
      
      else {
// console.log('Cache miss');
                
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = await axios.get(url)
        .then(response => parseMovies(response.data));
      
        console.log('Cache miss');
      
  }
  
  // console.log('response data = ' ,cache[key].data );

  // console.log('getWeather ELSE   hey = ',key , '    cache[key].timestamp = ', cache[key].timestamp , 'cache[key].data  = ', cache[key].data);
  return cache[key].data;
}



function parseMovies(movieData) {
console.log('in parseMovies') ;

  try {
    const movieSummaries = movieData.results.map(input => {
      return new MovieObj(input);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }

  // console.log(movieSummaries);
}







class MovieObj {
  constructor(inputObj) {
    console.log('in Movie Obj') ;

 

    let beginningUrl = 'https://image.tmdb.org/t/p/w500';

  

    this.title = inputObj.original_title;
    this.overview = inputObj.overview;
    this.total_votes = inputObj.vote_count;
    this.image_url = beginningUrl + inputObj.poster_path;
    this.popularity = inputObj.vote_average;
    this.release_date = inputObj.release_date;


  }
}
















module.exports = getMovies;