var express = require('express');
var router = express.Router();
var user = require('../modules/user');

// var admin = require('../modules/admin');
var admin_conf = require('../modules/admin_conf');



router.get('/login', function(req, res, next) {
	res.render('adminLogin');
});

router.get('/logout', function(req, res, next) {
	req.session.admin = null;
	res.redirect('/admin');
});

router.post('/login', function(req, res, next) {
	var admin_login = {
		name : req.body.name,
		password : req.body.password
	}

	console.log(admin_login.name == admin_conf.name )
	console.log(admin_login.password == admin_conf.password)

	// if (admin_login != admin_conf) {
	if (admin_login.name == admin_conf.name &&
		admin_login.password == admin_conf.password) {

		req.session.admin = admin_login;
		res.redirect('/admin');
	} else {
		console.log(admin_conf);
		console.log(admin_login);
		res.render('message', {
			msg : 'admin login faild.'
		})
	}
});

router.get('/', checkAdminLogin, function(req, res, next) {
	user.getAll(function(err, ans) {
		if (err) {
			console.log(err);
			res.render('message', {
				msg: 'unknown error *^*'
			});
		} else {
			res.render('admin', {
				users: ans
			});
		}
	});
});



router.get('/accept/:acid', checkAdminLogin, function(req, res, next) {
	user.accept(req.params.acid, function(err, ans) {
		if (err) {
			console.log(err);
			res.render('message', {
				msg: 'unknown error *^*'
			});
		} else {
			res.redirect('/admin');
		}
	})
});

router.get('/revoke/:rvid', checkAdminLogin, function(req, res, next) {
	user.revoke(req.params.rvid, function(err, ans) {
		if (err) {
			console.log(err);
			res.render('message', {
				msg: 'unknown error *^*'
			});
		} else {
			res.redirect('/admin');
		}
	})
});


function checkAdminLogin(req, res, next) {

	if (req.session.admin == null) {
		res.redirect('/admin/login');
	} else {
		next();
	}
};

module.exports = router;