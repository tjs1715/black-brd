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

};
