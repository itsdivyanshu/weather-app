const request = require('request')
const moment = require('moment')
require('dotenv').config()

const getWeather = (location, callback) => {
    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(location) + '&appid=' + process.env.API_KEY
    request({url, json : true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable connect to the Weather service.', undefined);
        } 
        else if(!body.coord) {
            callback('Location not found. Please try again.', undefined);
        }
        else {
            sunrise = moment(body.sys.sunrise*1000).utcOffset('+0530').format('hh:mm A')
            sunset = moment(body.sys.sunset*1000).utcOffset('+0530').format('hh:mm A')
            
            forecast = `<br><p>Weather summary: ${body.weather[0].description}</p>`
            forecast += `<p>The current temperature is ${Math.round((body.main.temp - 273.15) * 100) / 100} degrees. It feels like ${Math.round((body.main.feels_like - 273.15) * 100)/100} degrees.</p>`
            forecast += `<p>Sunrise: ${sunrise}&emsp;Sunset: ${sunset}&emsp;(+5:30 UTC)</p>`
            callback(undefined, {
                location: body.name + ', ' + body.sys.country,
                forecast: forecast
            });
        }
    })
}

module.exports = getWeather