var request = require('request')

var getUser = (id, callback) => {
	var user = {
		id: id,
		name: 'Jeff'
	}
	setTimeout(() => {
		callback(user)
	}, 3000);

};

getUser(31, (user)=>{
	console.log(user);
})

request('https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20phildelphia',
	(error, response, body) => {
		console.log(error);
		console.log('statusCode:', response && response.statusCode);
		console.log('body:', body)
	})