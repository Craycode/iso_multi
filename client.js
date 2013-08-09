var Client = IgeClass.extend({
	classId: 'Client',
	_handleEntityCreated: function(entity) {
		// Log entity creation.
		this.log('Entity created: ' + entity.id());
		// Handle created entity
		if (entity._classId === 'Tester') {
			//...
		}
	},
	_handleNetworkStart: function() {
		console.log('Network started');
		// Define network command listeners
		ige.network.define('test', this._onTest);

		// Send the server a test message
		ige.network.send('test', {moo: 'Some test data!'});

		// Send the server a request (gets a callback when the server responds!)
		ige.network.request('testRequest', {hello: 100}, function(data) {
			console.log('Request response received from server via callback with data:', data);
		});

		ige.network.addComponent(IgeStreamComponent)
			.stream.renderLatency(160)
			.stream.on('EntityCreated', this._handleEntityCreated);

		// Create scene.
		this.scene1 = new IgeScene2d().id('scene1');

		// Create main viewport.
		this.vp1 = new IgeViewport().id('vp1')
			.addComponent(IgeMousePanComponent)
			.mousePan.enabled(true)
			.autoSize(true)
			.scene(self.scene1)
			.drawBounds(true)
			.drawBoundsData(true)
			.drawMouse(true)
			.mount(ige);
	},
	_handleEngineStart: function(success) {
		if (success) {
			console.log('Starting network..');
			ige.network.start(Config.SERVER_URI, this._handleNetworkStart);
		}
	},
	init: function() {
		//ige.timeScale(0.1);
		ige.showStats(1);

		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Set FPS.
		ige.setFps(30);

		// Enable networking
		ige.addComponent(IgeSocketIoComponent);

		// Implement our game methods
		this.implement(ClientNetworkEvents);

		// Ask the engine to start
		ige.start(this._handleEngineStart);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Client;
}