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

		$scope.answerQuestion = function() {
			// is radio button selected correct?
			//
			var isCorrect = false;
			var answerKey = 'A';
			var rdoAnswers = document.getElementsByName('answers');
			for (var i = 0, length = rdoAnswers.length; i < length; i++) {
				if ((rdoAnswers[i].checked === true) && (rdoAnswers[i].value === true)) {
					isCorrect = true;
					break;
				}
			}

			var quiz = new Quiz({currentQuestion: $scope.randomQuestion._id,correct: isCorrect,	answerKey: answerKey});
			//quiz.body = {currentQuestion: $scope.randomQuestion._id,correct: isCorrect,	answerKey: answerKey};

			quiz.$update(function(response) {
				$scope.success = true;
				//Authentication.user = response;
				if ($scope.questionCount < 1){
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


/*	$location.path('/answers/' + $scope.randomQuestion._id);
			$http.put('/quiz',{
													currentQuestion: $scope.randomQuestion._id,
													correct: isCorrect,
													answerKey: answerKey
												}).success(function(data,status,headers,config) {
													console.log('gggg');
													$location.path('/answers/' + $scope.randomQuestion._id);
												});
*/
			//
			//var quiz = new Quiz();
			//quiz.$update({currentQuestion: $scope.randomQuestion});
		};
	}
]);
