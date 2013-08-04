/**
 * Options:
 * 
 * opacity_step: reduce opacity at this rate for each tick.
 * 
 * @type @exp;IgeClass@call;extend
 */
TestComponent = IgeClass.extend({
	classId: 'TestComponent',
	componentId: 'test_component',
	_options: {},
	_assignAnimation: function(entity) {
		return entity.animation.define('down', [1, 2, 3], 12, -1)
			.animation.define('left', [4, 5, 6], 12, -1)
			.animation.define('right', [7, 8, 9], 12, -1)
			.animation.define('down', [10, 11, 12], 12, -1);
	},
	init: function(entity, options) {
		this._entity = entity;

		this._options.opacity_step = options.hasOwnProperty('opacity_step') ? options.opacity_step : 0.01;

		var assign = this._assignAnimation;
		this._entity = assign(entity);

		entity.addBehaviour('test_component_behaviour', this._behaviour);
	},
	_behaviour: function() {
		// Reduce the opacity every tick
		//this.rotateBy(0, 0, 0.1);
	},
	test: function() {
		console.log(this._options);
	}
});