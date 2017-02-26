angular.module('app').service('mainService',function($http){
  let service = '';
  let gameArr = [];
  let gameObj = {
    gameType: '',
    matches: 0,
    points: 0
  };
  this.getGameObj = function(){
    return gameObj;
  }
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
      gameArr[3].matchWins++;
    }else if(str === 'teamtwo'){
      gameArr[4].matchWins++;
    }
  }
  this.resetArr = function(){
    gameArr = [];
  }
});//closing
