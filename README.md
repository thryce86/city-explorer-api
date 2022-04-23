# city-explorer-api
![image](https://user-images.githubusercontent.com/100101108/164126540-1b4943b9-2dc1-4df8-a461-78edee96691a.png)


# Lab 07 

**Author**: Your Name Goes Here
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->

## Credit and Collaborations
<!-- Give credit (and a link) to other people or 

##############################################################

Name of feature: ________________________________

Estimate of time needed to complete: 3

Start time: 0805

Finish time: _____

Actual time needed to complete: _____





################################################################################################################
1240 server is live need to integrate modules 
1256 queery comes in 
238 
cache up //////////////////////////////////////////////////////////////////////////////////////////////////////
lat = 2.351   ||  lon =  48.856
key =  weather-2.35148.856
http://api.weatherbit.io/v2.0/forecast/daily/?key=f4a7408107c14fb0babe69683fb52b76&lang=en&lat=2.351&lon=48.856&days=5
Cache hit
getWeather ELSE   hey =  weather-2.35148.856     cache[key].timestamp =  1650742654658 cache[key].data  =  Promise {
  [
    Weather { forecast: 'Broken clouds', time: '2022-04-23' },
    Weather { forecast: 'Scattered clouds', time: '2022-04-24' },
    Weather { forecast: 'Broken clouds', time: '2022-04-25' },
    Weather { forecast: 'Broken clouds', time: '2022-04-26' },
    Weather { forecast: 'Overcast clouds', time: '2022-04-27' }
  ]
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////