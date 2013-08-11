(function($) {

	var Config = {
		LOGIN_URL: '/login'
	};

	/**
	 * Initial.
	 */
	function _checkup(name, object_arr)
	{
		var ok = true;
		$.each(object_arr, function(k, v) {
			if (!v.length) {
				ok = false;
			}
		});

		if (!ok)
			console.log('Error when loading: ' + name + '.');

		return ok;
	}


	/**
	 * Document ready.
	 */
	$(function() {

		/**
		 * Login
		 */
		(function($) {
			// Setup
			var container_selector = '#head-login';
			// Initialise
			var login_container = $(container_selector);
			var submit = login_container.find('#input-button');
			var login_input = login_container.find('#input-login');
			var password_input = login_container.find('#input-password');

			// Checkup
			if (!_checkup('login', [login_container, submit, login_input, password_input]))
				return;
			// Execute
			var user = login_input.val();
			var password = password_input.val();

		})($);
	});
})(jQuery);