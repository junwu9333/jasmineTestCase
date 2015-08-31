(function(window, angular) {

"use strict";

describe("cets View Agreement", function() {


	var $rootScope, $scope, $controller;

    beforeEach(module("cetsApp"));


    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('cetsViewAgreementController', {'$rootScope' : $rootScope, '$scope': $scope});
    }));

    beforeEach(function(){
    	expect($scope.files.length).toBeLessThan(10)
    });

       it('should check the showSideNav to be true', function() {
       	 	expect($rootScope.showSideNav).toBeTruthy();
       });

       it('should check the scope values', function() {
       	 	expect($scope.fName).toBeTruthy();
       	 	expect($scope.lName).toBeTruthy();
       	 	expect($scope.termsList).toBeTruthy();
       	 	expect($scope.numberOfFiles).toBe(0);
       	 	expect($scope.browsedFiles).toBeTruthy();
       	 	expect($scope.files.length).toBe(0);
       	 	
       });

       it('should check the length of the files', function() {
       	expect($scope.files.length).toBe(0);
       });


		describe("file uploadFile",function(){

		beforeEach(function(){
    				expect($scope.files.length).toBeLessThan(10);
    				$scope.files = [];
    				$scope.browsedFiles = [];
    	});

		it('should check the file should be valid', function() {
       	 var files = { 0: { name:'file1.doc', size: 24000} };
       	 expect($scope.uploadFile(files)).toBe(true);
       	 expect($scope.files.length).toBe(1);
       	 expect($scope.files[0].name).toBe("file1.doc");
       	 expect($scope.files[0].size).toBe(24000);
       	 expect($scope.browsedFiles.length).toBe(1);
       	 expect($scope.browsedFiles[0].validationMsg).toBe("Success");
       	
       });


        it('should check the file extension not allowed', function() {
       	 var files = { 0: { name:'file1.xxx', size: 24000} };
       	 expect($scope.uploadFile(files)).toBe(true);
       	 expect($scope.files.length).toBe(1);
       	 expect($scope.files[0].name).toBe("file1.xxx");
       	 expect($scope.files[0].size).toBe(24000);
       	 expect($scope.browsedFiles.length).toBe(1);
       	 expect($scope.browsedFiles[0].validationMsg).toBe("File extension not allowed");
       });


         it('should check thie file size exceeds limit', function() {
       	 var files = { 0: { name:'file1.doc', size: 26000} };
       	 expect($scope.uploadFile(files)).toBe(true);
       	 expect($scope.files.length).toBe(1);
       	 expect($scope.files[0].name).toBe("file1.doc");
       	 expect($scope.files[0].size).toBe(26000);
       	 expect($scope.browsedFiles.length).toBe(1);
       	 expect($scope.browsedFiles[0].validationMsg).toBe("File size exceeds limit");
       });

	}); //upload file end 


it('should check the gotoCreateAgreement function', function() {
	$scope.gotoCreateAgreement();
	expect($rootscope.clrbtn).toBe(false);
	expect(location.path()).toBe('/createAgreement');
});

it('should check the cancel function', function() {
	$scope.cancel();
	expect(location.path()).toBe('/');
});

it('should check the doNotCancel function', function() {
	$scope.doNotCancel();
	expect($scope.showPopup).toBe(false);
});
      

//this is latest for save files please find and attch to your current file

it('should add the list to the below items', function() {

  $scope.saveFiles();
  expect($scope.showAttached).toBe(true);
  expect($scope.browsedFiles.length).toBe(3);
  expect($scope.saveUploadData.length).toBe(3);
  
});





  
});
})(window, window.angular);