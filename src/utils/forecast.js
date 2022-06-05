const request = require('postman-request');
require('dotenv').config();

const forecast = (lat, lon, cb) => {
	const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${lat},${lon}`;
	request({url, json: true}, (error, {body: {  error: locationError, current: weather, location}}) => {
		if (error) {
			cb('Unable to connect - try again later.', undefined);
		} else if(locationError) {
			cb('Unable to get the weather for the given location.', undefined);
		} else {
			cb(undefined, `${weather.weather_descriptions[0]} in ${location.name}, ${location.region}, ${location.country}. It is currently ${weather.temperature} degrees out. There is a ${weather.precip}% chance of raining`);
		}
	})
}

module.exports = forecast;