var Server = IgeClass.extend({
	classId: 'Server',
	Server: true,
	init: function(options) {
		var self = this;
		ige.log('Initialising server');

		Server.prototype._handleDbConnection = function() {
			self.log('Mongoose connection opened!');

			var user = new User('520784413ac690fc1b000002');
			console.log(user);
			

		};

		Server.prototype._mongooseConnect = function(url, open_callback) {
			Mongoose.connect(url);
			self._db = Mongoose.connection;
			self._db.on('error', console.error.bind(console, 'Mongoose connection error:'));
			self._db.once('open', open_callback);
		};

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
					.stream.start();

				// Accept incoming network connections
				ige.network.acceptConnections(true);

				// Create scene.
				self.scene1 = new IgeScene2d().id('scene1');

				// Create main viewport.
				self.vp1 = new IgeViewport()
					.id('vp1')
					.autoSize(false)
					.width(Config.VP_WIDTH)
					.height(Config.VP_HEIGHT)
					.scene(self.scene1)
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
		// Connect to database
		self._mongooseConnect(Config.DB.CONNECTION_STRING, self._handleDbConnection);
		// Add the networking component and define commands
		ige.addComponent(IgeNetIoComponent)
			.network.define('test', self._onTest)
			.network.define('testRequest', self._onTestRequest)

			// Start the network server
			.network.start(Config.SERVER_PORT, self._handleNetworkStart);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Server;
}