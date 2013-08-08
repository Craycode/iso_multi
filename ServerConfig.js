var config = {
	include: [
		/**
		 * Configs.
		 */
		{name: 'Config', path: './config/main'},
		/**
		 * Other.
		 */
		{name: 'ServerNetworkEvents', path: './gameClasses/ServerNetworkEvents'},
		{name: 'Tester', path: './gameClasses/Tester'},
		{name: 'TestComponent', path: './gameClasses/Components/TestComponent'}
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = config; }