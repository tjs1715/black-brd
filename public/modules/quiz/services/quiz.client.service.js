'use strict';

angular.module('quiz').factory('Quiz', ['$resource',
	function($resource) {
		return $resource('quiz/:questionId', {}, {
			update: {
				method: 'PUT'
			}
		});
	}]
);
