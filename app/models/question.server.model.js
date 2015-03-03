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
	a: {
		type: String,
		default: '',
		required: 'Each question must have an A answer',
		trim: true
	},
	b: {
		type: String,
		default: '',
		required: 'Each question must have a B answer',
		trim: true
	},
	c: {
		type: String,
		default: '',
		required: 'Each question must have a C answer',
		trim: true
	},
	d: {
		type: String,
		default: '',
		required: 'Each question must have a D answer',
		trim: true
	},
	answer: {
		type: String,
		default: '',
		required: 'Each question must have a correct answer',
		//match: ['/^([A-D]$)/', 'You must select A-D'],
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
