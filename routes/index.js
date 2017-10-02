"use strict";

module.exports = function(app){
	var controller = require("../controller")(app);

	var init = function(){
		routes();
	}

	var routes = function(){
		app.get('/', function(req, res){
			res.render('index');
		});

		app.get('/signup', function(req, res){
			res.render('users');
		});

		app.post('/signup', function(req, res){
			var userInfo = req.body;
			if(userInfo.password === userInfo.confirmPassword){
				controller.users.createUser(userInfo, function(error, users){
					console.log(error);
					console.log("users", users);
					if(error){
						res.render('error', {error: error});
					}else{
						res.render('login');
					}
				})	
			}else{
				let error = new Error("Please enter same password")
				res.render('error', {error: error});
			}
		})

		app.get('/login', function(req, res){
			res.render('login');
		})

		app.post('/login', function(req, res){
			var userInfo = req.body;
			console.log(userInfo);
			controller.users.checkUser(userInfo, function(error, user){
				if(error){
					console.log(error)
					res.render('error', {error: error})
				}else{
					res.render('message', {msg: user})
				}
			})
		})
	}

	return {
		init: init
	};
}