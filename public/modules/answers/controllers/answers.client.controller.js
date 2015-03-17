'use strict';

angular.module('answers').controller('AnswersController', ['$scope','$stateParams','$location','$http','Quiz','Users','Authentication',
	function($scope,$stateParams,$location,$http,Quiz,Users,Authentication) {
		$scope.authentication = Authentication;

		var user = new Users($scope.user);
		user.$update(function(response) {
			$scope.success = true;
			Authentication.user = response;
		}, function(response) {
			$scope.error = response.data.message;
		});


		var ques = Quiz.get({questionId:$stateParams.questionId});

		ques.$promise.then(
				function(res){
					$scope.question = res;
					// TODO: this needs to pull the actual question id.
					//
					for (var i = 0; i < user.questions.length; i++) {
						if (user.questions[i].currentQuestion === $stateParams.questionId) {
							$scope.question.answerKey = user.questions[i].answerKey;
							break;
						}
					}

			},
			function(error){console.log(error);});
			//location.reload();
		$scope.continue = function(){

			$location.path('/quiz');

		};

	}
]);
