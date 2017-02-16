angular.module('app').controller('homeCtrl',function($scope, $stateParams, mainService, $rootScope){
  //gametype is either singles or doubles
  //declare variables
  let gameType = "";
  $scope.singles = function(){
    gameType = "singles";
    console.log(gameType);
  }
  $scope.doubles = function(){
    gameType = "doubles";
    console.log(gameType);
  }
  $scope.test = "HELLOWORLD";
})//closing
