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

angular.module('app').service('mainService', function ($http) {}); //closing
'use strict';

angular.module('app').controller('homeCtrl', function ($scope, $stateParams, mainService, $rootScope) {
  //gametype is either singles or doubles
  //declare variables
  var gameType = "";
  $scope.singles = function () {
    gameType = "singles";
    console.log(gameType);
  };
  $scope.doubles = function () {
    gameType = "doubles";
    console.log(gameType);
  };
}); //closing
//# sourceMappingURL=bundle.js.map
