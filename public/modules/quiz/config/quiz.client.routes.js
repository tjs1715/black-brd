'use strict';

//Setting up route
angular.module('quiz').config(['$stateProvider',
	function($stateProvider) {
		// Quiz state routing
		$stateProvider.
		state('quiz', {
			url: '/quiz',
			templateUrl: 'modules/quiz/views/quiz.client.view.html'
		});
	}
]);
