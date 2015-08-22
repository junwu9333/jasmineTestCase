(function(window, angular) {

"use strict";

describe("drop dowwn directive", function() {

    var $rootScope, $scope, $controller;

    var dropDownServiceObj,
        compiledElement,
        scope,
        backend;

    beforeEach(module("cetsApp"));

    beforeEach(module("dropdownMultiselect"));


    
    beforeEach(inject(function(
        $rootScope,
        $compile,
        $http,
        $httpBackend,
         _$controller_
        ) {
        backend = $httpBackend;
        var ele = angular.element("<div class=\"btn-group\" data-ng-class=\"{open: open}\">"
                + "<button class=\"btn btn-small\">{{dropdownTitle}}</button>"
                + "<button class=\"btn btn-small dropdown-toggle\" data-ng-click=\"open=!open;openDropDown()\"><span class=\"caret\"></span></button>"
                + "<ul class=\"dropdown-menu scrollable-menu\" aria-labelledby=\"dropdownMenu\">"
                + "<li><input type=\"checkbox\" data-ng-change=\"checkAllClicked()\" data-ng-model=checkAll> Check All</li>"
                + "<li class=\"divider\"></li>"
                + "<li data-ng-repeat=\"option in options\"> <input type=\"checkbox\" data-ng-change=\"setSelectedItem(option.id)\" ng-model=\"selectedItems[option.id]\">{{option.name}}</li>"
                + "</ul>" + "</div>");

         $controller = _$controller_;

        //enter the element where it shoul be render (instead of body)
       
        angular.element("body").append(ele);
     
        scope = $rootScope.$new();


        spyOn($http, "post").and.returnValue({
            success: function(callback) {
                //callback(function name );
            }
        });


        scope.requestObject = {
            //request obj
        };
        $compile(element)(scope);
        scope.$digest();
        scope.init();
    }));

    it("Should select items", function() {
        var id = "xxxxxx";
        $scope.setSelectedItem(id);
        expect($scope.selectedItems[id]).toEqual(true);
    });


    it("Should deselect all items", function() {
        deselectAll();
        expect($scope.selectedItems.length).tobe(0);
    });

     it("Should select all items", function() {
        selectAll();
        for (var i=0; i<=$scope.selectedItems.length -1 ;i++){
             expect($scope.selectedItems[i]).tobe(true);
        }
       
    });

    
  
});


})(window, window.angular);