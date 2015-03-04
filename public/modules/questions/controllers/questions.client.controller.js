'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Authentication, Questions) {
		$scope.authentication = Authentication;

		//answer array
		$scope.answers = [];


		// Create new Question
		$scope.addQuestion = function() {
			// Create new Question object
			var question = new Questions ({
				name: this.name,
				answers: $scope.answers
			});

			// Redirect after save
			question.$save(function(response) {
				$location.path('questions/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.answerKey = '';
				$scope.answerValue = '';
				$scope.answerCorrect = false;

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Add an answer
		$scope.addAnswer = function() {
			$scope.answers.push({
				key: $scope.answerKey,
				value: $scope.answerValue,
				correct: $scope.answerCorrect
			});

			$scope.answerKey = '';
			$scope.answerValue = '';
			$scope.answerCorrect = false;
		};

		// Remove existing Question
		$scope.remove = function(question) {
			if ( question ) {
				question.$remove();

				for (var i in $scope.questions) {
					if ($scope.questions [i] === question) {
						$scope.questions.splice(i, 1);
					}
				}
			} else {
				$scope.question.$remove(function() {
					$location.path('questions');
				});
			}
		};

		// Update existing Question
		$scope.update = function() {
			var question = $scope.question;

			question.$update(function() {
				$location.path('questions/' + question._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Questions
		$scope.find = function() {
			$scope.questions = Questions.query();
		};

		// Find existing Question
		$scope.findOne = function() {
			$scope.question = Questions.get({
				questionId: $stateParams.questionId
			});
		};
	}
]);
