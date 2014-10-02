/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {


	tableName: 'LocalUser',
	

  attributes: {

  	permission_level: {
  		type: 'string',
  		enum: ['view', 'contribute', 'edit', 'admin'],
  		defaultsTo: 'contribute',
  		required: true
  	},

	  account: {
	  	type: 'string',
	  	required: true,
	  	unique: true,
	  },

	  password: {
	  	type: 'string',
	  	defaultsTo: '',
	  },

	  displayName: {
	  	type: 'string',
	  	required: true,
	  },

	  mail: {
	  	type: 'string',
	  	defaultsTo: '',
	  },

	  provider: {
	  	type: 'string',
	  	enum: ['ldap', 'local'],
	  	required: true,
	  }
  },


	beforeCreate: function(user, cb) {
    var bcrypt = require('bcrypt');
    if (user.password !== '') {
		  bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(user.password, salt, function(err, hash) {
		      if (err) {
		        console.log(err);
		        cb(err);
		      }else{
		        user.password = hash;
		        cb(null, user);
		      }
		    });
		  });
    } else {
    	cb();
    }
	},

	findOrCreateLocalUser: function (user, done) {
		User.findOne()
		.where({ account: user.sAMAccountName })
		.then(function (foundUser) {
			if (foundUser) return done(null, foundUser)
			User.create({
				account     : user.sAMAccountName,
				displayName : user.displayName,
				mail        : user.mail,
				provider    : 'ldap',
			})
			.then(function (createdUser) {
				return done(null, createdUser)
			})
			.fail(done);
		})
		.fail(done);	
	},


};