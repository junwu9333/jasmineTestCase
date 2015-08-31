/**
* Created by e7uldc on 7/22/2015.
* controller to view the agreement list
*/
var cetsViewAgreementController =["$scope", "$rootScope", "$log","$location", "CetsServiceFactory", "SessionKeeper",
    function ($scope,$rootScope,$log,$location,CetsServiceFactory,SessionKeeper) {
    $rootScope.showSideNav = true;
    $scope.showAttached =false;
               $scope.termsList = [];
 
//        var cetsSessionBean = getSessionData();
        $scope.browsedFiles = [];
 
        var regex  = /^(doc|docx|pdf|xls|xlsx|txt|csv|ppt|jpg)$/;
        var regexFileName =/^[a-zA-Z0-9-_\\" \"]+$/;
 
                 $scope.files ;
                 $scope.uploadFile = function(event){
                     $scope.files = event.target.files;
                                var numberOfRowsInTable = $scope.browsedFiles.length + $scope.files.length;
                     if(numberOfRowsInTable > 10) {
                      alert('More than 10 files cannot be attached');
                      return;
                  }
                     for (var i =0; i< $scope.files.length; i++ ){
                                var fileInfo = {
                                             fileName : '',
                                             validationMsg : ''
                         }
                                var fileName = $scope.files[i].name;
                                fileInfo.fileName = fileName;
                                var fileNameOnly = fileName.split(".");
                     var posDot = fileName.lastIndexOf(".");
                     var extension=fileName.substring(posDot+1);
 
                      //var extension = res[1];
                         if (!(regex.test(extension))) {
                                fileInfo.validationMsg = 'Unsupported file extension';
                           }
                                if($scope.files[i].size > 25000000) {
                                               if (fileInfo.validationMsg != ''){
                                                              fileInfo.validationMsg = fileInfo.validationMsg.concat(' & File cannot be more than 25MB');
                                               }else{
                                                              fileInfo.validationMsg = 'File cannot be more than 25MB';
                                               }
                      }
                                if (fileNameOnly[0].search(regexFileName) == -1) {
                                               if (fileInfo.validationMsg != ''){
                                                              fileInfo.validationMsg = fileInfo.validationMsg.concat(' & File name must be alpha numeric');
                                               }else{
                                                              fileInfo.validationMsg = 'File name must be alpha numeric';
                                               }
                           }
                                if (fileInfo.validationMsg == ''){
                                               fileInfo.validationMsg = 'Ready to Upload';
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
 
/*
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
*/
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
/*        var current=SessionKeeper.read();
        $scope.current=current;
        if(!cetsSessionBean){
            if(!current.cetsSessionBean){
                current.cetsSessionBean = resetCetsSessionBean();
            }
            cetsSessionBean = current.cetsSessionBean;
        }*/
        $scope.isSuccess = SessionKeeper.get('isAgmtCreated');;
        $scope.viewAgreementData.currentAgreement = SessionKeeper.get('currentAgreement');
        $scope.allComponentsToBeHidden = SessionKeeper.get('allComponentsToBeHidden');
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
        $scope.saveFiles=function(){
            console.log($scope.browsedFiles);
            $scope.showAttached=true;
            $scope.saveUploadData=[];
            for(var i=0;i<$scope.browsedFiles.length;i++){
                $scope.saveUploadData.push({"fileName":$scope.browsedFiles[i].fileName,"uploadStatus":"Uploaded","termCategory":"","Notes":$scope.browsedFiles[i].notes});
 
            }
            console.log($scope.saveUploadData);
 
        }
 
}];