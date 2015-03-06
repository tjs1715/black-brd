'use strict';

/**
 * Module dependencies.
 */


angular.module('quiz').controller('QuizController', ['$scope', '$stateParams', '$location', '$http', 'Quiz',
	function($scope, $stateParams, $location, $http, Quiz) {


		// Present question user has not answered
		$scope.grabQuestion = function() {
			$scope.questions = Quiz.query();

			$scope.questions.$promise.then(function(questionArray){
				$scope.randomQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
			});
		};

		$scope.answerQuestion = function() {
			// is radio button selected correct?
			//
			//var correctlyAnswered = ();


			// update existing user object with new question answered.
			//

			//var question = $scope.question;

			// the $update does a put, basically the line below.  TODO: not working
			$http.put('/quiz',{currentQuestion: $scope.randomQuestion._id});
			//
			//var quiz = new Quiz();
			//quiz.$update({currentQuestion: $scope.randomQuestion});






		//	var quiz = $scope.quiz;

		//	Quiz.$update(function() {
				//$location.path('/');
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		};
	}
]);
