var RotateBehaviour = function(ctx) {
	this.rotateBy(0, 0, 1 * Math.PI / 180);
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = RotateBehaviour;
}