var Tester = IgeEntity.extend({
	classId: 'Tester',
	_handleTexturesLoaded: function() {
		this
			.addComponent(IgeAnimationComponent)
			.addComponent(TestComponent, {opacity_step: 0.02})
			.animation.select('right')
			.texture(this.textures.textureCellSheet)
			.cell(1);
	},
	init: function() {
		IgeEntity.prototype.init.call(this);

		if (!ige.isServer) {
			this.textures = {
				textureCellSheet: new IgeCellSheet('./assets/textures/sprites/newchar01-1.png', 3, 4)
			};

			this.textures.textureCellSheet.on('loaded', this._handleTexturesLoaded);
		}
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Tester;
}