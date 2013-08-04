var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/ClientNetworkEvents.js',
		/* Custom */
		'./gameClasses/Tester.js',
		'./gameClasses/Behaviours/BehavioursStandard.js',
		'./gameClasses/Components/TestComponent.js',
		/* Standard game scripts */
		'./client.js',
		'./index.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }