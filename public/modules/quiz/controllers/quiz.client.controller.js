'use strict';

/**
 * Module dependencies.
 */


angular.module('quiz').controller('QuizController', ['$scope', '$stateParams', '$location', '$http', 'Quiz', 'Questions',
	function($scope, $stateParams, $location, $http, Quiz, Questions) {

		$scope.questionCount = 0;
		// Present question user has not answered
		$scope.grabQuestion = function() {
			$scope.questions = Quiz.query();

			$scope.questions.$promise.then(function(questionArray){
				$scope.randomQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];

			if (questionArray.length < 1) {
					$location.path('/dashboard');
				}
			$scope.questionCount = questionArray.length;
			});

		};

		$scope.setAnswerKey = function($event) {
			$scope.answerKey = $event.target.parent().next().value;
		};

		$scope.answerQuestion = function() {
			// is radio button selected correct?
			//
			var isCorrect = false;
			var answerKey = 'Z';
			var rdoAnswers = document.getElementsByName('answers');
			for (var i = 0, length = rdoAnswers.length; i < length; i++) {
				if (rdoAnswers[i].checked === true)  {
					var answerData = JSON.parse(rdoAnswers[i].value);
					answerKey = answerData.key;
					if (answerData.correct === true) {
						isCorrect = true;
					}

					break;
				}

			}
			if (answerKey !== 'Z') {
				var quiz = new Quiz({currentQuestion: $scope.randomQuestion._id,correct: isCorrect,	answerKey: answerKey});

				quiz.$update(function(response) {
					$scope.success = true;

					//Authentication.user = response;
					if ($scope.questionCount < 1){
						$scope.$apply();
						$location.path('/dashboard');
					}
					else
					{
						$location.path('/answers/' + $scope.randomQuestion._id);
					}
				}, function(response) {
					if ($scope.questionCount < 1){
						$location.path('/dashboard');
					}
					else
					{
						$location.path('/answers/' + $scope.randomQuestion._id);
					}
				});
			}
		};
	}
]);
