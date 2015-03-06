'use strict';

angular.module('answers').controller('AnswersController', ['$scope','$stateParams','$location','$http','Authentication','Quiz',
	function($scope,$stateParams,$location,$http,Authentication,Quiz) {
	  var ques = Quiz.get({questionId:$stateParams.questionId});

		ques.$promise.then(
				function(res){
					$scope.question = res;
					$scope.question.answerKey = Authentication.user.questions[0].answerKey;
			},
			function(error){console.log(error);});

		$scope.continue = function(){
			$location.path('/quiz');
		};
	}
]);
