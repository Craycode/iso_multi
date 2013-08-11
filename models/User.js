var User = Model.extend({
	classId: 'User',
	_schema: {
		name: String,
		password: String,
		_created: Date,
		_updated: Date,
		_removed: Date
	},
	init: function(mongoose, data) {
		Model.prototype.init.call(this, mongoose, data);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = User;
}