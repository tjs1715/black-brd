'use strict';

/**
 * Module dependencies.
 */


angular.module('quiz').controller('QuizController', ['$scope', '$stateParams', '$location', 'Quiz',
	function($scope, $stateParams, $location, Quiz) {
		// Controller Logic
		// ...

		// Present question user has not answered
		$scope.grabQuestion = function() {
			$scope.questions = Quiz.query();

			$scope.questions.$promise.then(function(questionArray){
				$scope.randomQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
			});
		};

		$scope.answerQuestion = function() {
			// update existing user object with new question answered.

		};
	}
]);
