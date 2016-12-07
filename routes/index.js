/**
 * Author: xuelanghu
 */

var express = require('express');
var router = express.Router();
var user = require('../modules/user');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    user: req.session.user,
    message: req.flash('message').toString()
  });
});

router.post('/login', checkLogout, function(req, res) {
	user.getByEmail(req.body.email, function(err, ans) {
		if (ans.toString() == '') {
			req.flash('message', 'no such user');
		}
		else if (req.body.password != ans[0].password) {
			req.flash('message', 'The password is incorrect');
		} else {
			getFromRowDataPacket(ans, function(_user) {
				req.session.user = _user;
				console.log('req.session.user');
				console.log(req.session.user);
			});
		}
		res.redirect('/');
	});
});


// router.get('/logout', checkLogin);
router.get('/logout', checkLogin, function(req, res) {
	console.log('logout');
	req.session.user = null;
	res.redirect('/');
});

router.get('/apply', checkLogin, function(req, res) {
  res.render('apply', {
    user: req.session.user,
    message: req.flash('message').toString()
  });
});


router.post('/apply', checkLogin, function(req, res) {
	console.log('apply');

	var _user = req.session.user;

	var _apply = {
		name: req.body.name,
		nick: req.body.nick,
		studentID: req.body.studentID,
		college: req.body.college,
		phone: req.body.tel,
		qq: req.body.qq
	}

	if (_apply.name == '' ||
		_apply.nick == '' ||
		_apply.college == '' ||
		_apply.studentID == '' ||
		_apply.college == '' ||
		_apply.phone == '' ||
		_apply.qq == '') {


		res.render('message', {
			msg: 'error, please input all infomation.',
    		message: req.flash('message').toString()
		})

	} else {

		// console.log(req.body.name);
		// console.log(req.body.nick);
		// console.log(req.body.studentID);
		// console.log(req.body.college);
		// console.log(req.body.tel);
		// console.log(req.body.qq);

		user.apply(_user.id, _apply, function(err, ans) {
			if (err) {
				console.log(err);
			} else {
				// console.log(ans);
			}
		});

		user.getById(req.session.user.id, function(err, ans) {
			if (err) {
				console.log(err);
			} else {
				getFromRowDataPacket(ans, function(_user) {
					req.session.user = _user;
				});
			}
			res.redirect('/apply');
		});
	}	
});


router.get('/regist', checkLogout, function(req, res) {
  res.render('regist', {
    user: req.session.user,
    message: req.flash('message').toString()
  })
});

router.post('/regist', checkLogout, function(req, res) {

	console.log('regist');
	// console.log(req.body.email);
	// console.log(req.body.password);
	// console.log(req.body.password_re);

	if (req.body.password != req.body.password_re) {
		res.redirect('/regist');
	} else {
		var new_user= {
			email: req.body.email,
			password: req.body.password,
			statu: 0,
			name: null,
			nick: null,
			studentID: null,
			college: null,
			phone: null,
			qq: null,
		}
		var user_reg = new user(new_user);
		user_reg.save(function(err, ans) {
			if (err) {
				res.render('message', {
					msg: 'regist error',
    				message: req.flash('message').toString()
				})
			} 
			console.log('user_reg session');
			// req.session.user = user_reg;
			res.redirect('/');
		});
	}
});

getFromRowDataPacket = function (res, callback) {
	var _user = new user({
		id:res[0].id,
		email: res[0].email,
		password: res[0].password,
		statu: res[0].statu,
		name: res[0].name,
		nick: res[0].nick,
		studentID: res[0].studentID,
		college: res[0].college,
		phone: res[0].phone,
		qq: res[0].qq
	});

	callback(_user);
};

function checkLogin(req, res, next) {
	if (req.session.user == null) {
		req.flash('message', 'Please login first');
		return res.redirect('/');
	}
	next();
};

function checkLogout(req, res, next) {
	if (req.session.user != null) {
		req.flash('message', 'Please logout first');
		return res.redirect('/');
	}
	next();
};

module.exports = router;
