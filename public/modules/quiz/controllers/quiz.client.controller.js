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
			//Question.find({})
		//	console.log('id = ' + req.userId);

			//$scope.question = Questions.get({
				//questionId: $stateParams.questionId
			//});
		};
	}
]);
