'use strict';

angular.module('answers').controller('AnswersController', ['$scope','$stateParams','$location','$http','Quiz','Users','Authentication',
	function($scope,$stateParams,$location,$http,Quiz,Users,Authentication) {
		$scope.authentication = Authentication;

		var user = new Users($scope.user);
		user.$update(function(response) {
			$scope.success = true;
			Authentication.user = response;

			// map keys
			var answeredQuestions = [];
			for (var i = 0; i < user.questions.length; i ++) {
				answeredQuestions[i] = user.questions[i].currentQuestion;
			}
			var answeredQuestionId = answeredQuestions.indexOf($stateParams.questionId);

			if (answeredQuestionId > -1)
			{
				var ques = Quiz.get({questionId:$stateParams.questionId});

				ques.$promise.then(
						function(res){
							$scope.question = res;
							$scope.question.answerKey = user.questions[answeredQuestionId].answerKey;

							// get actual key
							for (var i = 0; i < $scope.question.answers.length; i ++) {
								if ($scope.question.answers[i].correct === true) {
									$scope.correctAnswerKey = $scope.question.answers[i].key;
								}
							}
					},
					function(error){console.log(error);});
			}
			else {
				$location.path('/quiz');
			}

		}, function(response) {
			$scope.error = response.data.message;
			$location.path('/signin');
		});


				//location.reload();
			$scope.continue = function(){

				$location.path('/quiz');

			};

	}
]);
