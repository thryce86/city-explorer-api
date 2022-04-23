'use strict';

// require('dotenv');
require('dotenv').config();



const express = require('express');
const cors = require('cors');

//#td
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');
const app = express();

const PORT = process.env.PORT || 3002;

//#td Axios?




/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// USE
app.use(cors());


// to check this pig   # its up 
app.get('/', (req, res) => {
  res.status(200).send('This works');
});


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



app.get('/weather', weatherHandler);

// console.log('++++++++++++++++++++++++++++' ,  request.query);

            function weatherHandler(request, response) {
              ///added
              // console.log(request.query.lat);


              // const { lat, lon } = request.query;
            const lat = request.query.lat ;
            const lon = request.query.lon ;

              // console.log('lat =' , lat , '  ||  lon = '  , lon   )

              weather(lat, lon)
              .then(summaries => response.send(summaries))
              .catch((error) => {
                // console.error(error);
                response.status(200).send('Sorry. Something went wrong!')
              });
            }  
          
            // let movieUrl= baseUrl +`/movies?city=${this.state.city}` ; 
/////////////////////////////////////////////////////////////////////////////////////////////////
 app.get('/movies', movieHandler);

            // console.log('++++++++++++++++++++++++++++' ,  request.query);
            
function movieHandler(request, response) {
  
  ///added
  // console.log(request.query.city);

 const city = request.query.city ;

  movies(city )
  .then(summaries => response.send(summaries))
  .catch((error) => {
    // console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });



}           


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// at the bottom of all our routes:
app.get('*', (request, response) => {
  response.send('Not sure what you are a looking for, but it isn\'t here.');
});

app.listen(  PORT, () => console.log(`Server up on ${PORT}`));