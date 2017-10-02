"use strict";

module.exports = function(app){
	var init = function(){

	};

	var users = require('./users.controller')(app);

	return{
		init: init,
		users:users
	}
}