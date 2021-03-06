/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Check if the log user is an administrator
 *
 */
module.exports = function(req, res, next) {

	if (req.isSocket) {
		if (req.session.passport.user.permission_level == 'admin') {
			return next();
		}
	} 
	if (req.user && req.user.permission_level == 'admin') {
		return next();
	}

	return res.forbidden('ADMIN SECTION :: Only administrator can access');

};
