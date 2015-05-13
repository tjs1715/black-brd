'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Question = mongoose.model('Question'),
  _ = require('lodash');

exports.read = function(req, res) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  //var answeredQuestions = [];

  //for (var i = 0; req.user.questions.length > i; i ++) {
    //answeredQuestions[i] = req.user.questions[i].currentQuestion;
//  }
  //var answeredQuestionId = answeredQuestions.indexOf(req.question._id.toString());

  //if (answeredQuestionId > -1) {
    //res.json(req.question);
  //}
  //else {
  //  for (var i = 0; i < req.question.answers.length; i++) {
    //  req.question.answers[i].correct = false;
  //  }
  //  req.question.reason = '';
    //console.log(req.params.questionId);
    res.json(req.question);
  //}





    //var answeredQuestions = [];
  	//for (var i = 0; req.user.questions.length > i; i ++) {
  	//	answeredQuestions[i] = req.user.questions[i].currentQuestion;
  //	}
  	//var answeredQuestionId = answeredQuestions.indexOf(req.question._id.toString());

  //	if (answeredQuestionId > -1) {
  	//	res.jsonp(req.question);
  //	}
  //	else {
  	//	res.jsonp();
  //	}
};


/**
 * Create a Quiz
 */

exports.grabQuestion = function(req, res) {
  // pull out array of ids
  //
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  console.log('grab question');
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
      //console.log($stateParams.questionId);
      for (var i = 0; i < questions.length; i++) {
        for (var j = 0; j < questions[i].answers.length; j++) {
          questions[i].answers[j].correct = false;
        }

        questions[i].reason = '';
    }

      res.jsonp(questions);
    }
  });
};

exports.list = function(req, res) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  Question.find().sort('-created').populate('user', 'displayName').exec(function(err, questions) {
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
   var question = req.question;
   var user = req.user;
 //console.log(req.body);
   // add to list of answerwed questions
 //
   //console.log(req.user.questions);
   var previouslyAnswered = false;
   //var previousAnswer = '';
   //var i;
   for (var i = 0; i < req.user.questions.length; ++i){
   	if (req.user.questions[i].currentQuestion === req.body.currentQuestion) {
   		previouslyAnswered = true;
      //previousAnswer = req.user.questions[i].answerKey;
   		break;
   	}
   }
   if (!previouslyAnswered) {
   	req.user.questions.push(req.body);
   	req.user.save();
   //function(err) {
     //if (err) {
     //  return res.status(400).send({
       //  message: errorHandler.getErrorMessage(err)
     //  });
     //} else {
 }
 //else {
   //if (previousAnswer === 'Z') {
    // console.log(req.user.questions[i]);
     //req.user.questions.splice(i);
     //req.user.save();

     //req.user.questions[i] = req.body;
     //req.user.save();

     //console.log(req.user.questions[i]);

 res.jsonp(user);
   //  }
   //});


 };

exports.answeredQuestionById = function(req,res,next,id){
   Question.findById(id,function(err,question){
    if(!err){
      req.question = question;
    }else
    {
      console.log(err);
    }

  });

  next();
};
