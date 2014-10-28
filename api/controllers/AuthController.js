/**
 * AuthController
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
   

	gateway: function (req, res) {
    if (!sails.settings || !sails.settings.ie_integration) 
      return res.redirect('/auth/login');
		return res.view({ layout: 'auth.layout' });
	},

	login: function (req, res) {
		if (!sails.settings || sails.settings.auth_login == 'basic_http') {
      return res.redirect('/auth/http');
    }
    else if (sails.settings.auth_login == 'sign_in') {
      return res.redirect('/auth/signin');
    }
	},

	http: function (req, res) {
    var connect = require('../../node_modules/sails/node_modules/express/node_modules/connect');
    var auth = connect.middleware.basicAuth(function (username, password, handleCallback) {

    	// Fake the request by adding username and password to it.
      req.body.username = username;
      req.body.password = password;

      authenticate(req, res, function (err, user) {
        if (err || !user) handleCallback(err, false);
        else req.logIn(user, function (err) {
          handleCallback(err, user);
        })
      });


    });

    // Calling the HTTP authentification 
    auth(req, res, function () {
    	if (sails.settings && req.user.permission_level == 'admin') return res.redirect('/admin');
    	return res.redirect('/');
    });

	},

	windows: function (req, res) {

    authenticate(req, res, function (err, user) {
      if (err || !user) return res.redirect('/auth/login');
      req.logIn(user, function (err) {
        return res.redirect('/');
      })
    });

	},

	signin: function (req, res) {
		return res.view({ layout: 'auth.layout' });
	},

  logout: function (req, res) {
    req.logout();
    return res.redirect('/auth/login');    
  },


  process: function (req, res) {
    authenticate(req, res, function (err, user) {
      if (err || !user) {
        req.flash('message', { message: 'bad_credentials or not enough priviledge' })
        return res.redirect('/auth/signin');
      }
      req.logIn(user, function (err) { 
        if (sails.settings && req.user.permission_level == 'admin') return res.redirect('/admin');
        return res.redirect('/');
      });
    })   
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthController)
   */
  _config: {}

};











