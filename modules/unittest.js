var user = require('./user');

// console.log(user);

// var alice = {

// 	email: '213@12',
// 	password: '123123',
// 	statu: 0,
// 	name: 'alice',
// 	nick: 'alice',
// 	studentID: '2013210756',
// 	college: 'ccnucs',
// 	phone: '12312312311',
// 	qq: '123123'
// }



// var user_alice = new user(alice);
// console.log(user_alice);
// user_alice.save(function(err, res) {
// 	console.log(res);
// });

// user.getByEmail('lf', function (err, res) {

// 	console.log(res[0].email, res[0].password);
// });

console.log('*-*');


user.revoke(13, function(err, res) {
	console.log(res);
});

