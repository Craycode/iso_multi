var Model = IgeEntity.extend({
	classId: 'Model',
	_loaded: false,
	_single: false,
	_documents: {},
	init: function(id) {
		IgeEntity.prototype.init.call(this);
		var self = this;

		/**
		 * Handle load of DB results.
		 */
		Model.prototype._handleLoadFromDB = function(err, results) {
			if (err)
			{
				self.log('Error when loading model ' + self.classId() + '. ' + err);
			}
			else
			{
				self._single = typeof results.length !== 'undefined' ? false : true;
				self._documents = results;
				self._loaded = true;
			}
		};

		self._mongooseModel = Mongoose.model(self.classId(), Mongoose.Schema(self._schema));

		if (id)
		{
			self._mongooseModel.findById(id).exec();
			//self._mongooseModel.find({}, self._handleLoadFromDB);
		}
		else
		{
			self._documents = new self._mongooseModel({});
			self._single = true;
			self._loaded = false;
		}
	},
	/**
	 * Save model.
	 * 
	 * callback: Callback with errors, results
	 * data: Optional. Data object to be set.
	 * 
	 */
	save: function(data) {
		var self = this;
		if (!data)
		{
			self.db.save(callback);
		}
		else
		{
			self._model.create(data, callback);
		}
	},
	/**
	 * Is model loaded from DB.
	 */
	loaded: function() {
		return this._loaded;
	},
	find: function(callback) {
		this._model.find({}).select('name password').exec(callback);
	},
	find_all: function(callback) {
		this._model.find({}).select('name password').exec(callback);
	},
	model: function() {
		return this._mongooseModel;
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') {
	module.exports = Model;
}