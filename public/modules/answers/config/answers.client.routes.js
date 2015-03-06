'use strict';

//Setting up route
angular.module('answers').config(['$stateProvider',
	function($stateProvider) {
		// Answers state routing
		$stateProvider.
		state('answers', {
			url: '/answers/:questionId',
			templateUrl: 'modules/answers/views/answers.client.view.html'
		});
	}
]);
