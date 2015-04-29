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
	name: {
		type: String,
		default: '',
		required: 'Please enter question',
		trim: true
	},
	answers: [
		{
			key: String,
			value: String,
			correct: Boolean
		}
	],
	reason: {
		type: String,
		default: '',
		required: 'Please enter a reason',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Question', QuestionSchema);
