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
  // pull out array of ids
  //
  var arrLength = req.user.questions.length;
  var questionIds = [];
  for (var i = 0; i < arrLength; i++) {
      questionIds.push(req.user.questions[i].currentQuestion);
  }

  //$nin - mongoose operator matches none of values specified in an array
  //
  Question.find({_id: {$nin : questionIds}}).exec(function(err, questions) {
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
//
  req.user.questions.push(req.body);
  req.user.save();

};
