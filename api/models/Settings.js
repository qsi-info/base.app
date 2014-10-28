/**
 * Settings
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'Settings',
	usage: 'admin',

  attributes: {
		

  	// Authentification settings
  	auth_strategy: {
  		type: 'string',
  		enum: ['full_integrated', 'mix', 'local_db'],
  		required: true,
  	},

  	auth_login: {
  		type: 'string',
  		enum: ['basic_http', 'sign_in'],
  		required: true,
  	},



		// LDAP configuration settings
		ldap_url: {
			type: 'string',
			defaultsTo: ''
		},

		ldap_domain: {
			type: 'string',
			defaultsTo: ''
		},

		ldap_basedn: {
			type: 'string',
			defaultsTo: ''
		},

		ldap_username: {
			type: 'string',
			defaultsTo: ''
		},

		ldap_password: {
			type: 'string',
			defaultsTo: ''
		},

		ie_integration: {
			type: 'boolean',
			required: true,
			defaultsTo: true,
		},

		everyone_permission_level: {
			type: 'string',
			required: true,
			defaultsTo: 'none',
			enum: ['none', 'view', 'contribute', 'edit'],
		},


		// App settings
		app_name: {
			type: 'string',
			defaultsTo: 'QSI - Base App',
		},

		app_theme: {
			type: 'string',
			defaultsTo: 'bootstrap/default',
		},
  

		// Permission Level 
		view_group: {
			type: 'string',
			required: true,
			defaultsTo: 'LDAP_VIEW_GROUP',
		},

		contribute_group: {
			type: 'string',
			required: true,
			defaultsTo: 'LDAP_CONTRIBUTE_GROUP',
		},

		edit_group: {
			type: 'string',
			required: true,
			defaultsTo: 'LDAP_EDIT_GROUP',
		},

  },




  beforeValidation: function (attrs, done) {
  	attrs.ie_integration = (attrs.ie_integration == 'on') ? true : false;
  	done();
  },





};
