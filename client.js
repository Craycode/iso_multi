var Client = IgeClass.extend({
	classId: 'Client',
	init: function() {
		//ige.timeScale(0.1);
		ige.showStats(1);

		// Load our textures
		var self = this;

		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Set FPS.
		ige.setFps(30);

		// Enable networking
		ige.addComponent(IgeSocketIoComponent);

		// Implement our game methods
		self.implement(ClientNetworkEvents);

		// Load the textures we want to use
		self.textures = {
			guy: new IgeTexture('./assets/textures/tiles/other4.png'),
			textureCellSheet: new IgeCellSheet('./assets/textures/sprites/newchar01-1.png', 3, 4)
		};

		ige.on('texturesLoaded', function() {
			// Ask the engine to start
			ige.start(function(success) {
				// Check if the engine started successfully
				if (success) {
					ige.network.start(Config.SERVER_URI, function() {
						// Define network command listeners
						ige.network.define('test', self._onTest);

						// Send the server a test message
						ige.network.send('test', {moo: 'Some test data!'});

						// Send the server a request (gets a callback when the server responds!)
						ige.network.request('testRequest', {hello: 100}, function(data) {
							console.log('Request response received from server via callback with data:', data);
						});
					});

					// Create scene.
					self.scene1 = new IgeScene2d().id('scene1');

					// Create main viewport.
					self.vp1 = new IgeViewport()
						.id('vp1')
						.addComponent(IgeMousePanComponent)
						.mousePan.enabled(true)
						.autoSize(true)
						.scene(self.scene1)
						.drawBounds(true)
						.drawBoundsData(true)
						.drawMouse(true)
						.mount(ige);

					var tester = new Tester()
						.id('tester')
						.addComponent(IgeAnimationComponent)
						.addComponent(TestComponent, {opacity_step: 0.02})
						.animation.select('right')
						.texture(self.textures.textureCellSheet)
						.cell(1)
						.mount(self.scene1);

					tester.test_component.test();
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Client;
}