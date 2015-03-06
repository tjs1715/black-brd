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

				if (questionArray.length < 1) {
					$location.path('dashboard');
				}
			});

		};

		$scope.answerQuestion = function() {
			// is radio button selected correct?
			//
			var isCorrect = false;
			var rdoAnswers = document.getElementsByName('answers');
			for (var i = 0, length = rdoAnswers.length; i < length; i++) {
				if (rdoAnswers[i].checked && rdoAnswers[i].value) {
					isCorrect = true;
					break;
				}
			}

			$http.put('/quiz',{
													currentQuestion: $scope.randomQuestion._id,
													correct: isCorrect
												});
			$location.path('/answers/' + $scope.randomQuestion._id);
			//
			//var quiz = new Quiz();
			//quiz.$update({currentQuestion: $scope.randomQuestion});
		};
	}
]);
