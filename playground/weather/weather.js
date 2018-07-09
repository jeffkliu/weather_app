const request = require('request')

const weatherTemp = (latitude, longitude, callback) => {
	request({
			url: `https://api.darksky.net/forecast/2522988caee6dae5e4de3ec4ec4ec954/${latitude},${longitude}`,
			json: true
		}, (err, response, body) => {
			if(err){
				callback('Unable to connect to server.');
			} else if (body.code === 400){
				callback('Please check your latitude and longitude');
			} else if (response.statusCode===200) {
				callback(undefined, body.currently);
			}
		})
}

module.exports = {
	weatherTemp
}