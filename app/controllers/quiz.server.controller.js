'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Question = mongoose.model('Question'),
  _ = require('lodash');

/**
 * Create a Quiz
 */
exports.grabQuestion = function(req, res) {
  //$nin - mongoose operator matches none of values specified in an array
  //
  Question.find({_id: {$nin : req.user.questions}}).exec(function(err, questions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(questions);
    }
  });
};

/**
 * Show the current Quiz
 */
exports.answerQuestion = function(req, res) {
  var question = req.question ;
  var user = req.user;

  // add to list of answerwed questions
  console.log(req.body);

  req.user.questions.push(req.body.currentQuestion);
  req.user.save();
  console.log(req.user);
};
  // get the question id and what answer key was selected from client side
  //

  // add data to user doc
  //

	//question = _.extend(question , req.body);


  // save the data to the user doc
  //
/*  user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
  */
