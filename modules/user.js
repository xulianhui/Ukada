var sqlstring = require('sqlstring');
var pools = require('./pools');

var user = function (_user) {
	this.id  = _user.id;
	this.email = _user.email;
	this.password = _user.password;
	this.statu = _user.statu;
	this.nick = _user.nick;
	this.teamer1 = _user.teamer1;
	this.teamer2 = _user.teamer2;
	this.teamer3 = _user.teamer3;
	this.school = _user.college;
	this.phone = _user.phone;
	this.qq = _user.qq;
};

module.exports = user;

var getRes = function(querystr, callback) {
 	pools.getConnection(function(err, con) {
		if (err) {
			callback(err, null);
		} else {
			con.query(querystr, function(err, res) {
				con.release();
				if (err) {
					callback(err, null);
				} else {
					// console.log("-_-");
					callback(null, res);
				}
		  	});
		}
  	});
}

user.prototype.save = function (callback) {
	var qustr = sqlstring.format('INSERT INTO users (email, password, statu, nick, teamer1, teamer2, teamer3, school, phone, qq ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
								this.email,
								this.password,
								this.statu,
								this.nick,
								this.teamer1,
								this.teamer2,
								this.teamer3,
								this.school,
								this.phone,
								this.qq ]);

	console.log(qustr);

	getRes(qustr, callback)
};

user.getByEmail = function(email, callback) {
	var qustr = sqlstring.format('SELECT * FROM users WHERE email = ?', [email]);
	console.log(qustr);
	getRes(qustr, callback);
};


user.getById = function(id, callback) {
	var qustr = sqlstring.format('SELECT * FROM users WHERE id = ?', id);
	console.log(qustr);
	getRes(qustr, callback);
}

user.apply = function(_id, _apply, callback) {
	var qustr = sqlstring.format('update users set statu = 1, nick = ?, teamer1 = ?, teamer2 = ?, teamer3 = ?, school = ?, phone = ?, qq = ? where id = ?', [
								_apply.nick,
								_apply.teamer1,
								_apply.teamer2,
								_apply.teamer3,
								_apply.school,
								_apply.phone,
								_apply.qq,
								_id]);
	console.log(qustr);
	getRes(qustr, callback);
}

user.accept = function(_id, callback) {
	var qustr = sqlstring.format('UPDATE users SET statu = 2 WHERE id = ?', [_id]);
	console.log(qustr);
	getRes(qustr, callback);
}

user.revoke = function(_id, callback) {
	var qustr = sqlstring.format('UPDATE users SET statu = 1 WHERE id = ?', [_id]);
	console.log(qustr);
	getRes(qustr, callback);
}

user.getAll = function(callback) {
	var qustr = sqlstring.format('SELECT * FROM users');
	console.log(qustr);
	getRes(qustr, callback);
}
