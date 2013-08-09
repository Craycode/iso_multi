var Server = IgeClass.extend({
	classId: 'Server',
	Server: true,
	init: function(options) {
		ige.log('Initialising server');
		var self = this;

		Server.prototype._handleNetworkStart = function() {
			ige.log('Handling network start');
			// Networking has started so start the game engine
			ige.start(self._handleEngineStart);
		};

		Server.prototype._handleEngineStart = function(success) {
			ige.log('Handling engine start');

			// Check if the engine started successfully
			if (success) {
				// Add the network stream component
				ige.network.addComponent(IgeStreamComponent)
					.stream.sendInterval(30)
					.stream.renderLatency(100)
					.stream.start();

				// Accept incoming network connections
				ige.network.acceptConnections(true);

				// Create scene.
				self.scene1 = new IgeScene2d().id('scene1');

				// Create main viewport.
				self.vp1 = new IgeViewport()
					.id('vp1')
					.autoSize(true)
					.scene(self.scene1)
					.drawBounds(true)
					.drawBoundsData(true)
					.mount(ige);
				
				self.obj = [];

				self.obj[0] = new Tester()
					.id('tester1')
					.streamMode(1)
					.mount(self.scene1);
			}
		};

		// Add the server-side game methods / event handlers
		self.implement(ServerNetworkEvents);
		// Add the networking component and define commands
		ige.addComponent(IgeSocketIoComponent)
			.network.define('test', self._onTest)
			.network.define('testRequest', self._onTestRequest)

			// Start the network server
			.network.start(Config.SERVER_PORT, self._handleNetworkStart);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Server;
}