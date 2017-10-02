"use strict";

var mongoose = require('mongoose');

var users = require('./users');

module.exports = function(app){
	var init = function(){
		mongoose.connect('mongodb://localhost/my_db')
	};

	return {
		init: init,
	};
};