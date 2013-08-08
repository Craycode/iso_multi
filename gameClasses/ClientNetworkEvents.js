var ClientNetworkEvents = {
	_onTest: function (data) {
		console.log('Test command received from server with data:', data);
	}
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ClientNetworkEvents; }