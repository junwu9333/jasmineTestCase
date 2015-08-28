var app = angular.module("mainApp", ["error.message"]);


app.controller('mainCtrl', function($scope, errorMessages){

	$scope.message1 = errorMessages.INVALID_DATE;
	$scope.message2 = errorMessages.IS_REQUIRED;

});

