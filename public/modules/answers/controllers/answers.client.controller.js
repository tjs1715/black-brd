'use strict';

angular.module('answers').controller('AnswersController', ['$scope','$stateParams','Questions',
	function($scope,$stateParams,Questions) {
		var ques = Questions.get({questionId: $stateParams.questionId});
		ques.$promise.then(function(q){$scope.question = q;}, function(e){console.log(JSON.stringify(e));});
	}
]);
