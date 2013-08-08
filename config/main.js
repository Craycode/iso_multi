var SERVER_PROTOCOL = 'http';
var SERVER_HOST = '127.0.0.1';
var SERVER_PORT = 2000;

var Config = {
	SERVER_HOST: SERVER_HOST,
	SERVER_PORT: SERVER_PORT,
	SERVER_URI: SERVER_PROTOCOL+'://'+SERVER_HOST+':'+SERVER_PORT
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Config;
}