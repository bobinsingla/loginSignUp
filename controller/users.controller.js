"use strict";

var user = require("../model/users");


module.exports = function(app){
	var createUser = function(userInfo, callback){
		user.findOne({email: userInfo.email}).exec(function (err, doc){
			if(err){
				console.log(err);
			}else{
				if(doc){
					console.log("doc", doc);				
					if(doc.email != null){
						var error = new Error("This email already exist");
						callback(error , null);
					}
				}else{
					var newUser = new user({
						email: userInfo.email,
						password: userInfo.password
					});
					newUser.save(callback);	
				}
			}
		});
	}

	var checkUser = function(userInfo, callback){
		console.log("userInfo", userInfo);
		user.findOne({email: userInfo.email}).exec(function (err, doc){
			if(err){
				console.log(err)
			}else{
				if(doc){
					if(doc.password != userInfo.password){
						var error = new Error("Please enter valid password");
						callback(error , null);
					}else{
						console.log("doc 2", doc);
						callback(error, doc);
					}
				}else{
					var error = new Error("You need to Sign Up before Login");
					callback(error , null);
				}
			}
		})
	}

	return {
		createUser: createUser,
		checkUser: checkUser
	};
};