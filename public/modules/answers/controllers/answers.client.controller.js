'use strict';

angular.module('answers').controller('AnswersController', ['$scope','$stateParams','Authentication',
	function($scope,$stateParams) {
		//var question = $stateParams;
		$scope.question = $stateParams.questionId;
		$scope.user = Authentication.user;

	}
]);
