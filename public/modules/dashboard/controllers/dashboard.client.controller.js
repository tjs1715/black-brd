'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope',  'Authentication', 'Questions',
	function($scope, Authentication, Questions) {
		$scope.authentication = Authentication;

		$scope.questions = Questions.query();

		$scope.questions.$promise.then(function(questionArray){
			$scope.totalQuestions = questionArray.length;

			$scope.totalAnswered = $scope.authentication.user.questions.length;

			var arrLength = $scope.totalAnswered;
			var totalCorrect = 0;
			for (var i = 0; i < arrLength; i++) {
				if ($scope.authentication.user.questions[i].correct) {
					totalCorrect++;
				}
			}

			$scope.correctAnswers = totalCorrect;

			if($scope.totalAnswered === 0) {
				$scope.quizButtonText = 'Start Quiz';
			}
			else if($scope.totalAnswered > 0 && $scope.totalAnswered < $scope.totalQuestions) {
				$scope.quizButtonText = 'Continue Quiz';
			}

		});


	}
]);
