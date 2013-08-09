var Tester = IgeEntity.extend({
	classId: 'Tester',
	init: function() {
		var self = this;
		IgeEntity.prototype.init.call(self);

		Tester.prototype._handleTexturesLoaded = function() {
			self
				.addComponent(IgeAnimationComponent)
				.addComponent(TestComponent, {opacity_step: 0.02})
				.animation.select('right')
				.texture(self.textures.textureCellSheet)
				.cell(1);
		};

		if (!ige.isServer) {
			self.textures = {
				textureCellSheet: new IgeCellSheet('./assets/textures/sprites/newchar01-1.png', 3, 4)
			};

			self.textures.textureCellSheet.on('loaded', self._handleTexturesLoaded);
		}
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Tester;
}