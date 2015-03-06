'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var quiz = require('../../app/controllers/quiz.server.controller');

	//Quiz route
	//
	app.route('/quiz')
		.get(quiz.grabQuestion)
		.put(users.requiresLogin, quiz.answerQuestion);
};
