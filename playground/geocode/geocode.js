const request = require('request');

const geocodeAddress = (address, callback) => {

	const encodedAddress = encodeURIComponent(address);

	const key = 'AIzaSyA-7KlkAohBN4oOZUpPCtGxWz0JCtTI7BQ';

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
		json: true
	}, (error, response, body)=> {
		if (error){
			callback('Google servers may be down.')
		} else if (body.status==='ZERO_RESULTS') {
			callback('Unable to find that address.')
		} else if (body.status==='OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		};
	})

}

module.exports = {
	geocodeAddress
}