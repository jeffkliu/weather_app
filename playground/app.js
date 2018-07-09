const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')
const request = require('request')

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


geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(results.address);
		weather.weatherTemp(results.latitude, results.longitude, (error, results) => {
			if(error){
				console.log(error);
			} else {
				console.log(`It is currently ${results.temperature} degrees. However, it feels like ${results.apparentTemperature} degrees.`);
			}
		});
	}

})
