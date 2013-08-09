var Server = IgeClass.extend({
	classId: 'Server',
	Server: true,
	_handleEngineStart: function(success) {
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
			this.scene1 = new IgeScene2d().id('scene1');

			// Create main viewport.
			this.vp1 = new IgeViewport()
				.id('vp1')
				.autoSize(true)
				.scene(this.scene1)
				.drawBounds(true)
				.drawBoundsData(true)
				.mount(ige);
		}
	},
	_handleNetworkStart: function() {
		// Networking has started so start the game engine
		ige.start(this._handleEngineStart);
	},
	init: function(options) {
		// Add the server-side game methods / event handlers
		this.implement(ServerNetworkEvents);
		ige.log('Implemented events');
		// Add the networking component and define commands
		ige.addComponent(IgeSocketIoComponent)
			.network.define('test', this._onTest)
			.network.define('testRequest', this._onTestRequest)

			// Start the network server
			.network.start(Config.SERVER_PORT, this._handleNetworkStart);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Server;
}