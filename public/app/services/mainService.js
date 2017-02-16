angular.module('app').service('mainService',function($http){
  let service = '';
  let gameArr = [];
  //gametype 0
  //matchType 1
  //pointType 2
  //teamOne 3
  //teamTwo 4
  // $scope.teamTwo = {
  //   name: $scope.nameTwo,
  //   color: color,
  //   first: null,
  //   matchWins:0
  // };
  this.setGameArr = function(x){
    gameArr.push(x);
  };
  this.getGameArr = function(){
    return gameArr;
  }
  this.setServer = function(num){
    gameArr[num].first = true;
    if(num === 3){
      service = "teamOne";
    }else{
      service = "teamTwo";
    }
    return gameArr[num].name;
  }
  this.getService = function(){
    return service;
  }
  this.setMatchWin = function(str){
    if(str === 'teamone'){
      
    }
  }
});//closing
