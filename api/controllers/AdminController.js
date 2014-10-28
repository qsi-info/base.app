/**
 * AdminController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
	index: function (req, res) {
		return res.view({ layout: 'admin.layout.ejs' });
	},

	authentification: function (req, res) {
		return res.view({ layout: 'admin.layout.ejs' });
	},

	updateSettings: function (req, res) {
		Settings.update(sails.settings.id, req.body)
		.then(function (settings) {
			setup(settings[0]);
			return res.redirect('/admin');
		})
		.fail(function (err) {
			return console.log(err);
		})
	},

	updateTheme: function (req, res) {
		req.body.ie_integration = sails.settings.ie_integration == true ? 'on' : 'off';
		Settings.update(sails.settings.id, req.body)
		.then(function (settings) {
			setup(settings[0]);
			return res.redirect('/admin');
		})
		.fail(function (err) {
			return console.log(err);
		})
	},


	users: function (req, res) {
		User.find()
		.sort('account')
		.where({ permission_level: { not: 'admin' }})
		.then(function (users) {
			return res.view({ users: users, layout: 'admin.layout.ejs' });
		})
	},


	theme: function (req, res) {
		return res.view({ layout: 'admin.layout.ejs' });
	},


	credentials: function (req, res) {
		User.findOne(1)
		.then(function (admin) {
			return res.view({ admin: admin, layout: 'admin.layout.ejs' });
		})
	},


	updateCredentials: function (req, res) {
		var password = req.body.password;
		User.update(1, { password: password }, function (err, user) {
			if (err) return console.log(err);
			return res.redirect('/admin');
		})
	},



	database: function (req, res) {
		return res.view({ layout: 'admin.layout.ejs' });
	},


	model: function (req, res) {
		var model = req.param('model');
		return res.view({ layout: 'admin.layout.ejs', model: sails.models[model] });
	},

	settings: function (req, res) {
		return res.view({ layout: 'admin.layout.ejs' });
	},


	uninstall: function (req, res) {
		User.query("DROP TABLE " + Settings._tableName, function (err) {
			if (err) return console.log(err);
			User.query("DROP TABLE " + User._tableName, function (err) {
				if (err) return console.log(err);
				delete sails.settings;
				return res.view({ layout: 'auth.layout.ejs' });
			})
		})
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AdminController)
   */
  _config: {}

  
};
