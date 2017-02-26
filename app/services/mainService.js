angular.module('app').service('mainService',function($http){
  let service = '';
  let gameArr = [];
  let gameObj = {
    type: 0,
    matches: 0,
    points: 0,
    teamOneName: '',
    teamOneColor: '',
    teamTwoName: '',
    teamTwoColor: '',
    start: 0
  };
  this.getGameObj = function(){
    return gameObj;
  }
  this.setType = function(num){
    gameObj.type = num;
  }
  this.setMatches = function(num){
    gameObj.matches = num;
  }
  this.setPoints = function(num){
    gameObj.points = num;
  }
  this.setTeamNameOne = function(str){
    gameObj.teamOneName = str;
  }
  this.setTeamColorOne = function(str){
    gameObj.teamOneColor = str;
  }
  this.setTeamNameTwo = function(str){
    gameObj.teamTwoName = str;
  }
  this.setTeamColorTwo = function(str){
    gameObj.teamTwoColor = str;
  }
  this.setStarter = function(num){
    gameObj.start = num;
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
