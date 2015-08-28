(function(window, angular) {

"use strict";

var datePre = "Please enter or pick a ";


angular.module("error.message", [])
.value("errorMessages", {
    INVALID_DATE:  " Please enter a valid date.",
    IS_REQUIRED: "This is a required field.",

});

})(window, window.angular);
