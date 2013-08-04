var Tester = IgeEntity.extend({
	classId: 'Tester',
	init: function() {
		IgeEntity.prototype.init.call(this);
		ige.log('Tester loaded!');

		this._ticks = 0;
	},
	update: function(ctx) {
		IgeEntity.prototype.update.call(this, ctx);
	},
	getTicks: function() {
		return this._ticks;
	},
	getTime: function()
	{
		console.log(ige.currentTime());
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Tester;
}