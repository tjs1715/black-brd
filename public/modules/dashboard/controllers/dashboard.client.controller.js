'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope',  'Authentication', 'Questions', 'Users',
	function($scope, Authentication, Questions, Users) {
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

			$scope.resetQuizProgress = function() {
				var user = new Users($scope.authentication.user);
				user.questions.length = 0;
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});

			};
		});


	}
]);
