angular.module('app').service('mainService',function($http){
  let gameArr = [];
  //gametype 0
  //matchType 1
  //pointType 2
  //teamOne 3
  //teamTwo 4
  this.setGameArr = function(x){
    gameArr.push(x);
  };
  this.getGameArr = function(){
    return gameArr;
  }
  this.setServer = function(num){
    gameArr[num].first = true;
    return gameArr[num].name;
  }
});//closing
