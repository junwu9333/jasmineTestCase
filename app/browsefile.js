/*cetsApp.directive('fileread', function () {
 
    return {
       scope: { numberOfFiles: "=count" },
        restrict: 'EA',
        link: function(scope, elem, attr, ctrl) {
            console.log(attr.numberOfFiles);
 
            function bindEvent(element, type, handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                } else {
                    element.attachEvent('on' + type, handler);
                }
            }
 
            bindEvent(elem[0], 'change', function() {
                //alert('File size:' + this.files[0].size);
                console.log(this.files[0].name);
                count = this.files[0].length;
                if(this.files[0].size>25000) {
                    alert('Size exceeds limit');
                }// else {
                    //alert('validation size successful');
               // }
 
                var fileName = this.files[0].name;
                var res = fileName.split(".");
                var extension = res[1];
                var regex  = /^(doc|docx|pdf|xls|xlsx|txt|csv|ppt|jpg)$/;
 
                    if (!(regex.test(extension))) {
                        alert('extension is not allowed');
                    }
                    if(this.files.length >10) {
                        alert('Only 10 files allowed');
                    }
               
 
 
            }),
                scope.setSelectedItem = function(forecast) {
                    scope.forecast = forecast;
                };
 
        }
    }
});*/
 
//var myApp = angular.module('cetsApp', []);
cetsApp.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});