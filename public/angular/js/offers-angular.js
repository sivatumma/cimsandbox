"use strict";
var category_type = ["ARTS", "CULTURE & ENTERTAINMENT","DINING","GROUPS","HOTELS","MUSIC & NIGHTLIFE","SHOPPING","SPORTS & RECREATION","TOURS & ATTRACTIONS","TRANSPOTATION"];
var crowd_level = ['LOW','MEDIUM','HIGH'];
var parking_available =['LOW','MEDIUM','HIGH'];
var model_type = ['OFFER','EVENT','LOCATION','EMSP']
var ferquency_type = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120];
var profile=angular.module('profile', [ 'angularFileUpload','ui.bootstrap','ui.date','google-maps','ngRoute'])
    .config([
    '$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'login.html'
        }).when('/offers', {
                templateUrl: 'offers_list.html'
        }).otherwise({
                redirectTo: '/'
        });;
        }])
    .controller('offerController',offerController)
    .controller('loginController',loginController)
    .controller('offersController',offersController);

function loginController ($scope,$location){
    $scope.user={
        username:'',
        password:''
    };
    $scope.showError=false;
    $scope.login=function (){
        $scope.showError=false;
        if($scope.user.username == 'adming' && $scope.user.password == 'Passw@rd'){
            $location.path("/offers");
            return ;
        }
        $scope.showError=true;
    }
}


 function offerController ($scope,$modalInstance, $http, $timeout, $upload,$window,$rootScope) {
     $scope.offer={
        title:'',
         thumb:'',
         coupon : '',
         location:'',
         latlng:{"lat": "41.8337329","lng": "-87.7321555"},
         description:'',
         category:'ARTS',
         date:'',
         crowd_level:'LOW',
         parking_available:'LOW',
         featured:'false',
         model:'OFFER',
         radius: 0,
         frequency: 60
    }


    $scope.map = {center: {latitude: $scope.offer.latlng.lat, longitude: $scope.offer.latlng.lng }, zoom: 6 };
    $scope.options = {scrollwheel: true};

    $scope.marker = {
        id:0,
        coords: {
            latitude: $scope.offer.latlng.lat,
            longitude: $scope.offer.latlng.lng
        },
        options: { draggable: true },
        events: {
            dragend: function (marker, eventName, args) {

                $scope.offer.latlng.lat=marker.getPosition().lat();
                $scope.offer.latlng.lng= marker.getPosition().lng();
            }
        }
    }

    $scope.category_type = $window.category_type;
    $scope.crowd_level=$window.crowd_level;
    $scope.parking_available = $window.parking_available;
    $scope.model_type = $window.model_type;
    $scope.ferquency_type = $window.ferquency_type;
    $scope.latlng = {
        lat : $scope.lat,
        lng : $scope.lng
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.onFileSelect=function ($files){
        var file = $files[0];
        if (!file.type.match('image.*')) {
            return ;
        }
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                $scope.$apply(function () {
                    $scope.localUrl=e.target.result ;
                });
            };
        })(file);
            reader.readAsDataURL(file);
        $scope.upload = $upload.upload({
            url: '/upload',
            file: file
        }).progress(function(evt) {
           }).success(function(data, status, headers, config) {
                $scope.hascover=true;
               $scope.offer.thumb=data.image;
               }).error(function (err){

            });
    }

    $scope.onCouponFileSelect=function ($files){
        var file = $files[0];
        if (!file.type.match('image.*')) {
            return ;
        }
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                $scope.$apply(function () {
                    $scope.couponLocalUrl=e.target.result ;
                });
            };
        })(file);
        reader.readAsDataURL(file);
        $scope.upload = $upload.upload({
            url: '/upload',
            file: file
        }).progress(function(evt) {
            }).success(function(data, status, headers, config) {
                $scope.hascover=true;
                $scope.offer.coupon=data.image;
            }).error(function (err){

            });
    }



    $scope.createOffer=function (){

        $http({
            method: 'POST',
            url: '/offers',
            data: $scope.offer
        }).success(function (data, status, headers, config) {
                $rootScope.$broadcast('newoffer',data);
                $modalInstance.close();

        }).error(function (data, status, headers, config) {
                $scope.message = 'Unexpected Error';
            });
    }

    $scope.resetForm=function (){

        $scope.offer={
            title:'',
            thumb:'',
            coupon:'',
            location:'',
            latlng:{"lat": "41.8337329","lng": "-87.7321555"},
            description:'',
            category:'ARTS',
            date:'',
            crowd_level:'LOW',
            parking_available:'LOW',
            featured:'false',
            model:'OFFER',
            radius: 0,
            frequency: 0
        } ;
        $scope.hascover=false;
    }

}

var editOfferController = function($scope,$modalInstance, $http, $timeout, $upload,$window,$rootScope,offer) {
    $scope.offer=offer;
   // $scope.offer.date=$window.jQuery.datepicker.formatDate('yy/mm/dd', offer.date);


    $scope.category_type = $window.category_type;
    $scope.crowd_level=$window.crowd_level;
    $scope.parking_available = $window.parking_available;
    $scope.model_type = $window.model_type;
    $scope.ferquency_type = $window.ferquency_type;

    $scope.map = {center: {latitude: $scope.offer.latlng.lat, longitude: $scope.offer.latlng.lng }, zoom: 6 };
    $scope.options = {scrollwheel: true};

    $scope.marker = {
        id:0,
        coords: {
            latitude: $scope.offer.latlng.lat,
            longitude: $scope.offer.latlng.lng
        },
        options: { draggable: true },
        events: {
            dragend: function (marker, eventName, args) {
                $scope.offer.latlng.lat=marker.getPosition().lat();
                $scope.offer.latlng.lng= marker.getPosition().lng();
            }
        }
    }

    $scope.cancel = function () {
     $modalInstance.dismiss('cancel');
    };

    $scope.onFileSelect=function ($files){
        var file = $files[0];
        if (!file.type.match('image.*')) {
            return ;
        }
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                $scope.$apply(function () {
                    $scope.localUrl=e.target.result ;
                    $scope.localImageName=file.name;
                });
            };
        })(file);

        reader.readAsDataURL(file);

        $scope.upload = $upload.upload({
            url: '/upload',
            data: {myObj: $scope.myModelObj},
            file: file
        }).progress(function(evt) {
            }).success(function(data, status, headers, config) {
                $scope.offer.thumb=data.image;

            }).error(function (err){

            });
    }

    $scope.onCouponFileSelect=function ($files){
        var file = $files[0];
        if (!file.type.match('image.*')) {
            return ;
        }
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                $scope.$apply(function () {
                    $scope.couponLocalUrl=e.target.result ;
                });
            };
        })(file);
        reader.readAsDataURL(file);
        $scope.upload = $upload.upload({
            url: '/upload',
            file: file
        }).progress(function(evt) {
            }).success(function(data, status, headers, config) {
                $scope.hascover=true;
                $scope.offer.coupon=data.image;
            }).error(function (err){

            });
    }

        $scope.updateOffer=function (index){

        $http({
            method: 'POST',
            url: '/offers/'+$scope.offer._id,
            data: $scope.offer
        }).success(function (data, status, headers, config) {
               $modalInstance.close();
            }).error(function (data, status, headers, config) {
                $scope.message = 'Unexpected Error';
            });
    }

}

function offersController ($scope,$http,$window,$rootScope,$modal){
    $scope.offersList=[];
    $http({
        method: 'GET',
        url: '/offers'
    }).success(function (data,status,headers,config){
            $scope.offersList=data;
    }).error(function (data,status,headers,config){
         alert('Error while loading Offers.')
    });
    $rootScope.$on('newoffer',function (e,o){
        $scope.offersList.unshift(o);
    })

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'create_offer_model.html',
            controller: offerController,
            size: size

        });

        modalInstance.result.then(function (selectedItem) {
           }, function () {
        });
    };

    $scope.edit_offer=function (index){

        var modalInstance = $modal.open({
            templateUrl: 'edit_offer_model.html',
            controller: editOfferController,
            size: 500,
            resolve: {
                offer: function () {
                    return $scope.offersList[index];
                }
            }
        });

    }


    $scope.delete_offer=function (index){

       if($window.confirm('Are you sure to delete Offer.')){
           $http({
               method: 'DELETE',
               url: '/offers/'+$scope.offersList[index]._id
           }).success(function (data, status, headers, config) {
                   $scope.offersList.splice(index,1);
           })
       }

    }
}



