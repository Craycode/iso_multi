var Client = IgeClass.extend({
	classId: 'Client',
	init: function() {
		var self = this;

		Client.prototype._handleEngineStart = function(success) {
			if (success) {
				console.log('Starting network..');
				ige.network.start(Config.SERVER_URI, self._handleNetworkStart);
			}
		};

		Client.prototype._handleNetworkStart = function() {
			console.log('Network started');
			// Define network command listeners
			ige.network.define('test', self._onTest);

			// Send the server a test message
			ige.network.send('test', {moo: 'Some test data!'});

			// Send the server a request (gets a callback when the server responds!)
			ige.network.request('testRequest', {hello: 100}, function(data) {
				console.log('Request response received from server via callback with data:', data);
			});

			ige.network.addComponent(IgeStreamComponent)
				.stream.renderLatency(160)
				.stream.on('entityCreated', self._handleEntityCreated);

			// Create scene.
			self.scene1 = new IgeScene2d().id('scene1');

			// Create main viewport.
			self.vp1 = new IgeViewport().id('vp1')
				.addComponent(IgeMousePanComponent)
				.mousePan.enabled(true)
				.autoSize(true)
				.scene(self.scene1)
				.drawBounds(true)
				.drawBoundsData(true)
				.drawMouse(true)
				.mount(ige);
		};

		Client.prototype._handleEntityCreated = function(entity) {
			// Log entity creation.
			self.log('Entity created: ' + entity.id());
			// Handle created entity
			if (entity._classId === 'Tester') {
				//...
				entity.cell(2);
			}
		};

		//ige.timeScale(0.1);
		ige.showStats(1);

		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Set FPS.
		ige.setFps(30);

		// Enable networking
		ige.addComponent(IgeSocketIoComponent);

		// Implement our game methods
		self.implement(ClientNetworkEvents);

		// Ask the engine to start
		ige.start(self._handleEngineStart);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Client;
}