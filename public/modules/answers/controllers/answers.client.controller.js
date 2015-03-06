'use strict';

angular.module('answers').controller('AnswersController', ['$scope','$stateParams','$location','Questions',
	function($scope,$stateParams,$location,Questions) {
		var ques = Questions.get({questionId: $stateParams.questionId});
		ques.$promise.then(function(q){$scope.question = q;}, function(e){console.log(JSON.stringify(e));});

		$scope.continue = function(){
			$location.path('/quiz');
			$scope.$apply();
		};
	}
]);
