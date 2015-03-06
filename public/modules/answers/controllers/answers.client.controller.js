'use strict';

angular.module('answers').controller('AnswersController', ['$scope','$stateParams', '$state','Questions', '$location',
	function($scope,$stateParams,$state,Questions, $location) {
		var ques = Questions.get({questionId: $stateParams.questionId});
		ques.$promise.then(function(q){$scope.question = q;}, function(e){console.log(JSON.stringify(e));});

	//	$scope.continue = function(){
			//$location.path('/quiz');
		//	$window.location.href = '/#!/quiz';


		//	Questions.reload();
		//	$location.path('/quiz');
			//$state.reload();
			//$window.location.href = 'http://localhost:3000/#!/quiz';
			//$state.reload();
	}
]);
