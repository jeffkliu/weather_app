const request = require('request')

var geocodeAddress = (address) => {
	const encodedAddress = encodeURIComponent(address);

	const key = 'AIzaSyA-7KlkAohBN4oOZUpPCtGxWz0JCtTI7BQ';

	return new Promise((resolve,reject) => {
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
			json: true
		}, (error, response, body)=> {
			if (error){
				reject('Google servers may be down.')
			} else if (body.status==='ZERO_RESULTS') {
				reject('Unable to find that address.')
			} else if (body.status==='OK') {
				resolve({
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			};
		})
	})
};

geocodeAddress('94560').then((location) =>{
	console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage)=>{
	console.log(errorMessage)
});