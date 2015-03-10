'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope', 'Authentication', 'Questions', 'Users',
	function($scope, Authentication, Questions, Users) {

		$scope.authentication = Authentication;

	//	$scope.$watch('$scope.totalQuestionsObj', function(newVal, oldVal){
		//		console.log('changed');
	//	}, true);

		$scope.loadDashboard = function() {
			// save user to ensure most up to date stats
			//
			/*var user = new Users($scope.user);
			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
*/

			$scope.questions = Questions.query();
			var totalCorrect = 0;
			$scope.questions.$promise.then(function(questionArray){
				$scope.totalQuestionsObj = {totalQuestions:0};
				$scope.totalAnsObj = {totalAnswered: 0};

				$scope.totalQuestionsObj = {totalQuestions: questionArray.length};

				//$scope.totalAnswered = $scope.authentication.user.questions.length;
				$scope.totalAnsObj = {totalAnswered: $scope.authentication.user.questions.length};

				var arrLength = $scope.totalAnsObj.totalAnswered;

				for (var i = 0; i < arrLength; i++) {
					if ($scope.authentication.user.questions[i].correct) {
						totalCorrect++;
					}
				}
				$scope.correctAnswersObj = {correctAnswers: totalCorrect};

				if($scope.totalAnsObj.totalAnswered === 0) {
					$scope.quizButtonText = 'Start Quiz';
				}
				else if($scope.totalAnsObj.totalAnswered > 0 && $scope.totalAnsObj.totalAnswered < $scope.totalQuestionsObj.totalQuestions) {
					$scope.quizButtonText = 'Continue Quiz';
				}

				if ($scope.correctAnswersObj.totalAnswered > $scope.totalQuestionsObj.totalQuestions) {
					$scope.correctAnswersObj.totalAnswered = $scope.totalQuestionsObj.totalQuestions;
				}

			});

		};

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
	}
]);
