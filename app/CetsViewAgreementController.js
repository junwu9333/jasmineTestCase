angular.module('cetsApp',[]).controller('cetsViewAgreementController', function ($rootScope,$scope) {
    $rootScope.showSideNav = true;
 
    $scope.viewAgmt = function(id) {
            $scope.fName = $scope.users[id-1].fName;
            $scope.lName = $scope.users[id-1].lName;
    };
 
});

 
_____________________________________
/**
* Created by e7upcp on 7/22/2015.
* controller to view the agreement list
*/
var cetsViewAgreementController =["$scope", "$rootScope", "$log","$location", "CetsServiceFactory", "SessionKeeper",
    function ($scope,$rootScope,$log,$location,CetsServiceFactory,SessionKeeper) {
    $rootScope.showSideNav = true;
        $scope.termsList = [];
		$scope.numberOfFiles = 0;
        var cetsSessionBean = getSessionData();
        $scope.browsedFiles = [];
    
        var regex  = /^(doc|docx|pdf|xls|xlsx|txt|csv|ppt|jpg)$/;
 
                 $scope.files = [];
                 $scope.uploadFile = function(){
                     $scope.files = event.target.files;
                     if($scope.files.length >10) {
                      alert('Only 10 files allowed');
                  }
                     for (var i =0; i< $scope.files.length; i++ ){
                                var fileInfo = {
                                            
                                             fileName : '',
                                             validationMsg : 'Success!'
                       
                         }
                                var fileName = $scope.files[i].name;
                                fileInfo.fileName = fileName;
                         var res = fileName.split(".");
                         var extension = res[1];
                         if (!(regex.test(extension))) {
                                fileInfo.validationMsg = 'File extension not allowed';
                           }
                                if($scope.files[i].size>25000) {
                                               fileInfo.validationMsg = 'File size exceeds limit';
                          //alert('Size exceeds limit');
                      }
                                $scope.browsedFiles.push(fileInfo);
                               
                     }
                     
                      $scope.$apply();
                       var filename = event.target.files[0].name;
                       //alert('file was selected: ' + filename);
                   };
                   //----------------------------------------
                                $scope.termCategory = [
                                          {
                                              "name": "Setup",
                                              "id": "1"
                                          },
                                          {
                                              "name": "Loan Level",
                                              "id": "2"
                                          },
                                          {
                                              "name": "Policy Administration",
                                              "id": "3"
                                          },
                                          {
                                              "name": "Payables/Receivable",
                                              "id": "4"
                                         },
                                          {
                                              "name": "Loss Mitigation",
                                              "id": "5"
                                          },
                                          {
                                              "name": "Claims/Settlements",
                                              "id": "6"
                                         },
                                          {
                                              "name": "Eligibility Criteria",
                                              "id": "7"
                                          },
                                          {
                                              "name": "Premium",
                                              "id": "8"
                                          },
                                          {
                                              "name": "Termination/Cancellation",
                                              "id": "9"
                                          },
                                          {
                                              "name": "Reporting",
                                              "id": "10"
                                          }];
 
                         $scope.member = {
                                      termCategory: [{
                                 //id: "1"
                             }]
                         };
                         $scope.selected_items = [];
                     // $scope.termCategory.push();
                  
 
    function resetCetsSessionBean(){
        //to reset the current session
        cetsSessionBean=CetsServiceFactory.initCetsSessionBean($scope.current);
        return cetsSessionBean;
    }
 
    function saveSessionData(cetsSessionBean){
        //To save the data in session
        $scope.current.cetsSessionBean=cetsSessionBean;
        SessionKeeper.save();
    }
    function getSessionData(){
        var current=SessionKeeper.read();
        $scope.cetsSessionBean=current.cetsSessionBean;
        return current.cetsSessionBean;
    }
 
    $scope.viewAgreementData = {
        //It will go  to view the Agreement data
        currentAgreement : "",
        createdBy : ""
    };
 
    $scope.gotoCreateAgreement=function(){
               $rootScope.clrbtn=false;
   
        $location.path('/createAgreement');
       
    };
 
               $scope.getTermsList = function(agmtId){
                              CetsServiceFactory.getAgmtSummaryTerms(agmtId).then(function(promise) {
                                             if(promise != false){
                                                            $scope.viewAgreementData.termsList = promise.data.ceBaseDtoList;
                                             }
                              });
               };
 
    if(null!==$location.path() && $location.path().length>0 && "/viewAgreement"===$location.path()){
        $log.debug("cetsViewAgreementController :: In View Agreement controller");
        var current=SessionKeeper.read();
        $scope.current=current;
        if(!cetsSessionBean){
            if(!current.cetsSessionBean){
                current.cetsSessionBean = resetCetsSessionBean();
            }
            cetsSessionBean = current.cetsSessionBean;
        }
        $scope.isSuccess = cetsSessionBean.isAgmtCreated;
        $scope.viewAgreementData.currentAgreement = cetsSessionBean.currentAgreement;
        $scope.viewAgreementData.createdBy = cetsSessionBean.currentAgreement.createdBy;
        $scope.viewAgreementData.allComponentsToBeHidden = current.cetsSessionBean.allComponentsToBeHidden;
                              $scope.getTermsList($scope.viewAgreementData.currentAgreement.agreementId);
    }
/*
    $scope.showNewAgreementButton = function(){
        if($scope.viewAgreementData && $scope.viewAgreementData.allComponentsToBeHidden &&
            $scope.viewAgreementData.allComponentsToBeHidden[0] &&
            $scope.viewAgreementData.allComponentsToBeHidden[0].componentName &&
            $scope.viewAgreementData.allComponentsToBeHidden[0].componentName === 'MgAgmt_CrteEdit'){
            return false;
        }
        return true;
    }
*/
    $scope.cancel = function(){
        //$scope.showPopup = true;
               $location.path('/');
    }
    $scope.doNotCancel = function(){
        $scope.showPopup = false;
    }
    $scope.cancelDetails = function(){
        //cancel the details in the list
        window.history.back();
    }
 
}];