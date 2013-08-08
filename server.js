var Server = IgeClass.extend({
	classId: 'Server',
	Server: true,
	init: function(options) {
		var self = this;

		// Add the server-side game methods / event handlers
		this.implement(ServerNetworkEvents);
		ige.log('Implemented events');
		// Add the networking component
		ige.addComponent(IgeSocketIoComponent)
			// Define a network command
			.network.define('test', self._onTest)
			.network.define('testRequest', self._onTestRequest)
			// Start the network server
			.network.start(Config.SERVER_PORT, function() {
			// Networking has started so start the game engine
			ige.log('Port: '+Config.SERVER_PORT);
			ige.start(function(success) {
				// Check if the engine started successfully
				if (success) {
					// Accept incoming network connections
					ige.network.acceptConnections(true);
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Server;
}