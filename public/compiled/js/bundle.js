'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  //default router
  //home page and landing page
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './app/routes/home/homeTemp.html',
    controller: 'homeCtrl'
  }).state('gameSetting', {
    url: '/gameSetting',
    templateUrl: './app/routes/home/gameSettingTemp.html',
    controller: 'homeCtrl'
  }).state('gameSettingTwo', {
    url: '/gameSettingTwo',
    templateUrl: './app/routes/home/gameSettingTwoTemp.html',
    controller: 'homeCtrl'
  }).state('teamOne', {
    url: '/teamOne',
    templateUrl: './app/routes/home/teamOneTemp.html',
    controller: 'homeCtrl'
  }).state('teamTwo', {
    url: '/teamTwo',
    templateUrl: './app/routes/home/teamTwoTemp.html',
    controller: 'homeCtrl'
  }).state('coinFlip', {
    url: '/coinFlip',
    templateUrl: './app/routes/home/coinFlipTemp.html',
    controller: 'homeCtrl'
  }).state('game', {
    url: '/game',
    templateUrl: './app/routes/home/gameTemp.html',
    controller: 'homeCtrl'
  });

  $urlRouterProvider.otherwise('/');
}); //closing
'use strict';

angular.module('app').service('mainService', function ($http) {
  var service = '';
  var gameArr = [];
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
  this.setGameArr = function (x) {
    gameArr.push(x);
  };
  this.getGameArr = function () {
    return gameArr;
  };
  this.setServer = function (num) {
    gameArr[num].first = true;
    if (num === 3) {
      service = "teamOne";
    } else {
      service = "teamTwo";
    }
    return gameArr[num].name;
  };
  this.getService = function () {
    return service;
  };
  this.setMatchWin = function (str) {
    if (str === 'teamone') {}
  };
}); //closing
'use strict';

angular.module('app').controller('homeCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  //$scope.gameType is either singles or doubles
  //declare variables
  $scope.totalPoint = 0;
  $scope.teamOneScore = 0;
  $scope.teamTwoScore = 0;
  $scope.gameType = "";
  $scope.matchType = 0;
  $scope.pointType = 0;
  $scope.colors = ['red', 'blue', 'purple', 'green', 'orange', 'yellow'];
  $scope.nameOne = "";
  $scope.colorOne = '';
  $scope.nameTwo = "";
  $scope.teamOne = {};
  $scope.teamTwo = {};
  $scope.colorTwo = "";

  // //add score
  // $scope.addScore = function(str){
  //
  //   if(str === 'teamone'){
  //     $scope.teamOneScore++;
  //   }
  //   if(str === 'teamtwo'){
  //     $scope.teamTwoScore++;
  //   }
  //   $scope.totalPoint = $scope.teamOneScore + $scope.teamTwoScore;
  // }

  $scope.singles = function () {
    $scope.gameType = "singles";
    mainService.setGameArr($scope.gameType);
    console.log($scope.gameType);
  };
  $scope.doubles = function () {
    $scope.gameType = "doubles";
    mainService.setGameArr($scope.gameType);
    console.log($scope.gameType);
  };
  $scope.match = function (num) {
    if (num === 3) {
      $scope.matchType = 3;
      mainService.setGameArr($scope.matchType);
      console.log($scope.matchType);
    } else if (num === 5) {
      $scope.matchType = 5;
      mainService.setGameArr($scope.matchType);
      console.log($scope.matchType);
    } else {
      $scope.matchType = 7;
      mainService.setGameArr($scope.matchType);
      console.log($scope.matchType);
    }
  };
  $scope.point = function (num) {
    if (num === 11) {
      $scope.pointType = 11;
      mainService.setGameArr($scope.pointType);
      console.log($scope.pointType);
    } else {
      $scope.pointType = 21;
      mainService.setGameArr($scope.pointType);
      console.log($scope.pointType);
    }
  };
  $scope.colorSelect = function (color) {
    $scope.colorOne = color;
    // console.log($scope.colorOne);
  };
  $scope.setOne = function (color) {
    //check to see if word have been placed in input
    if ($scope.nameOne) {
      console.log(true, $scope.nameOne, color);
      $scope.teamOne = {
        name: $scope.nameOne,
        color: color,
        first: null,
        matchWins: 0
      };
      mainService.setGameArr($scope.teamOne);
      console.log($scope.teamOne, $scope.matchType);
    } else {
      console.log(false);
    }
  };
  $scope.setTwo = function (color) {
    //check to see if word have been placed in input
    if ($scope.nameTwo) {
      console.log(true, $scope.nameTwo, color);
      // $scope.teamtwo = new TeamBuilder($scope.nameTwo, color);
      $scope.teamTwo = {
        name: $scope.nameTwo,
        color: color,
        first: null,
        matchWins: 0
      };
      mainService.setGameArr($scope.teamTwo);
      console.log($scope.teamTwo, "two");
      console.log($scope.teamOne, "one");
      console.log(mainService.getGameArr());
    } else {
      console.log(false);
    }
  };
  //every view gets
  $scope.gameArr = mainService.getGameArr();
  //only set chooser if teamone and teamtwo exist
  if ($scope.gameArr[3] && $scope.gameArr[4]) {
    var correctIndex = Math.floor(Math.random() * 2 + 3);
    $scope.chooser = $scope.gameArr[correctIndex];
    console.log($scope.chooser.name);
  }
  $scope.coinFlipper = function () {
    var coin = Math.floor(Math.random() * 2);
    console.log(coin);
    if (coin) {
      //do for both view(scope) and data(service) MVC
      //select correct team = correctIndex
      //change team first key/prop
      $scope.gameArr[correctIndex].first = true;
      //write fn on service to find correct team, fn takes in an num, what number ?
      var correctName = mainService.setServer(correctIndex);
      console.log('Winner', correctName);
    } else {
      //set loser to null
      //select correct Winner
      //if index is 4
      if (correctIndex === 4) {
        //if 4 pass 3
        //set winner to true
        $scope.gameArr[3].first = true;
        var correctName = mainService.setServer(3);
        console.log('Winner', correctName);
      }
      //if index is 3
      if (correctIndex === 3) {
        //if 3 pass 4
        //set winner to true
        $scope.gameArr[4].first = true;
        var correctName = mainService.setServer(4);
        console.log('Winner', correctName);
      }
      //change for both view(scope) and data(service) MVC
      //change team first key/prop
      //write fn on service to find correct team, fn takes in an num, what number ?
      console.log('loser', $scope.chooser.name);
    }
  };

  ///////////////
  //CTRL FOR GAME//
  ////////////////
  if ($scope.gameArr[1] && $scope.gameArr[2]) {
    $scope.pointType = $scope.gameArr[2];
    $scope.matchTotal = $scope.gameArr[1];
  }
  //add score
  $scope.addScore = function (str) {
    //check pointype
    if (str === 'teamone') {
      $scope.teamOneScore++;
      //check to see if we need to increment matchwin, did they win
      if ($scope.teamOneScore === $scope.pointType + 1) {}
      console.log($scope.teamOneScore);
    }
    if (str === 'teamtwo') {
      $scope.teamTwoScore++;
      console.log($scope.teamTwoScore);
    }
    //adding up correct score after point is made
    $scope.totalPoint = $scope.teamOneScore + $scope.teamTwoScore;
    //see if player wins
    if ($scope.gameArr[3].matchWins === $scope.matchTotal - 1) {
      swal($scope.gameArr[3].name + ' WINS!!!!');
    }
  };
}); //closing
//# sourceMappingURL=bundle.js.map
