'use strict';

/**
 * Module dependencies.
 */


angular.module('quiz').controller('QuizController', ['$scope', '$stateParams', '$location', '$http', 'Quiz', 'Questions',
	function($scope, $stateParams, $location, $http, Quiz) {

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
			var checked = 0;
			var anyChecked = false;

			for (var i = 0, length = rdoAnswers.length; i < length; i++) {
					if (rdoAnswers[i].checked === true)  {
						checked = i;
						anyChecked = true;
						break;
					}
			}

			var quiz = new Quiz({currentQuestion: $scope.randomQuestion._id,correct: isCorrect,	answerKey: answerKey});

			quiz.$update();


			var ques = Quiz.get({questionId:$scope.randomQuestion._id});

			ques.$promise.then(
				function(res){
					answerKey = ques.answers[checked].key;
					if (ques.answers[checked].correct === true)
					{
						isCorrect = true;
					}

					if (anyChecked === true) {
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

				},
				function(error){console.log(error);});

		};
	}
]);
