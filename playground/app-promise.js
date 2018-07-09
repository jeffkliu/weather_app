const yargs = require('yargs');
const axios = require('axios')

const argv = yargs.options({
	a: {
		demand: true,
		alias: 'address',
		describe: 'Address to fetch weather for',
		string: true
	}
	})
	.alias('help', 'h')
	.help()
	.argv;

const encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA-7KlkAohBN4oOZUpPCtGxWz0JCtTI7BQ`;

axios.get(geocodeUrl)
	.then((response)=>{

		if(response.data.status==='ZERO_RESULTS'){
			throw new Error('Unable to find that address.');
		}



		var latitude = response.data.results[0].geometry.location.lat;
		var longitude = response.data.results[0].geometry.location.lng;

		var formatted_address = response.data.results[0].formatted_address;
		var weatherUrl = `https://api.darksky.net/forecast/2522988caee6dae5e4de3ec4ec4ec954/${latitude},${longitude}`;

		console.log(formatted_address)

		return axios.get(weatherUrl);
	}).then((response)=>{
		var temperature = response.data.currently.temperature;
		var apparentTemperature = response.data.currently.apparentTemperature;

		console.log(`Current temperature is ${temperature}, but feels like ${apparentTemperature}.`)
	}).catch((error)=>{
		if(error.code==='ECONNREFUSED'){
			console.log('Unable to connect to API servers.')
		} else {
			console.log(error.message);
		}
	})