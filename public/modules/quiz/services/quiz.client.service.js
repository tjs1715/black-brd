'use strict';

angular.module('quiz').factory('Quiz', ['$resource',
	function($resource) {
		return $resource('quiz', {}, {
			update: {
				method: 'PUT'
			}
		});
	}]
);
