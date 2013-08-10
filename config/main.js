var SERVER_PROTOCOL = 'http';
var SERVER_HOST = '82.46.22.219';
var SERVER_PORT = 2000;

var Config = {
	SERVER_HOST: SERVER_HOST,
	SERVER_PORT: SERVER_PORT,
	SERVER_URI: SERVER_PROTOCOL+'://'+SERVER_HOST+':'+SERVER_PORT,
	VP_WIDTH: 800,
	VP_HEIGHT: 600
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Config;
}