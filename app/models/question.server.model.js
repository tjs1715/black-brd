'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	question: {
		type: String,
		default: '',
		required: 'Question is a required field.',
		trim: true
	},
	answerList: [String],
	correctAnswer: {
		type: Number,
		default: 0,
		required: 'One answer must be correct.'
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	state: {
		type: Number,
		default: 1
		}
});

mongoose.model('Question', QuestionSchema);
