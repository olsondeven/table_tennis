angular.module('app').controller('homeCtrl',function($scope, $state, $stateParams, mainService, $rootScope){
  //declare variables
  let totalPoint = 0 ;
  $scope.teamOneScore = 0;
  $scope.teamTwoScore = 0;
  $scope.gameType = "";
  $scope.matchType = 0;
  $scope.pointType = 0;
  $scope.colors = ['red','blue','purple','green','orange','yellow'];
  $scope.colorOne = '';
  $scope.nameOne = "";
  $scope.nameTwo = "";
  $scope.teamOne = {};
  $scope.teamTwo = {};

  $scope.pickGameType = function(str){
    if(str === 'singles'){
      $scope.gameType = "singles";
      mainService.setGameArr($scope.gameType);
    }else{
      $scope.gameType = "doubles";
      mainService.setGameArr($scope.gameType);
    }
    console.log($scope.gameType);
  }

  $scope.match = function(num){
    if (num === 3) {
      $scope.matchType = 3;
      mainService.setGameArr($scope.matchType);
      console.log($scope.matchType);
    }else if (num === 5) {
      $scope.matchType = 5;
      mainService.setGameArr($scope.matchType);
      console.log($scope.matchType);
    }else {
      $scope.matchType = 7;
      mainService.setGameArr($scope.matchType);
      console.log($scope.matchType);
    }
  }
  $scope.point = (num)=>{
    if (num === 11) {
      $scope.pointType = 11;
      mainService.setGameArr($scope.pointType);
      console.log($scope.pointType);
    }else {
      $scope.pointType = 21;
      mainService.setGameArr($scope.pointType);
      console.log($scope.pointType);
    }
  }
  $scope.colorSelect = (color)=>{
    $scope.colorOne = color;
    // console.log($scope.colorOne);
  }
  $scope.setOne = function(color){
    //check to see if word have been placed in input
    if ($scope.nameOne && color) {
      // console.log(true,$scope.nameOne,color);
      $scope.teamOne = {
        name: $scope.nameOne,
        color: color,
        first: null,
        matchWins:0
      };
      mainService.setGameArr($scope.teamOne);
      // console.log($scope.teamOne, $scope.matchType);
      $state.go('teamTwo');

    }else{
      swal('Please enter name and select color')
      console.log(false);
    }
  }
  $scope.setTwo = function(color){
    //check to see if word have been placed in input
    if ($scope.nameTwo && color) {
      // console.log(true,$scope.nameTwo,color);
      // $scope.teamtwo = new TeamBuilder($scope.nameTwo, color);
      $scope.teamTwo = {
        name: $scope.nameTwo,
        color: color,
        first: null,
        matchWins:0
      };
      mainService.setGameArr($scope.teamTwo);
      // console.log($scope.teamTwo,"two");
      // console.log($scope.teamOne,"one");
      // console.log(mainService.getGameArr());
      $state.go('coinFlip');
    }else{
      swal('Please enter name and select color')
      // console.log(false);
    }
  }
  //every view gets
  $scope.gameArr = mainService.getGameArr();
  $scope.service = mainService.getService();
  //only set chooser if teamone and teamtwo exist
  if($scope.gameArr[3] && $scope.gameArr[4]){
    var correctIndex = Math.floor(Math.random()*2+3);
    $scope.chooser = $scope.gameArr[correctIndex];
    // console.log($scope.chooser.name);
  }
  $scope.coinFlipper = function(){
    var coin = Math.floor(Math.random()*2);
    // console.log(coin);
    if (coin) {
      //do for both view(scope) and data(service) MVC
      //select correct team = correctIndex
      //change team first key/prop
      $scope.gameArr[correctIndex].first = true;
      //write fn on service to find correct team, fn takes in an num, what number ?
      var correctName = mainService.setServer(correctIndex);
      console.log('Winner',correctName);
    }else{
      //set loser to null
      //select correct Winner
      //if index is 4
      if (correctIndex === 4) {
        //if 4 pass 3
        //set winner to true
        $scope.gameArr[3].first = true;
        var correctName = mainService.setServer(3);
        console.log('Winner',correctName);
      }
      //if index is 3
      if (correctIndex === 3) {
        //if 3 pass 4
        //set winner to true
        $scope.gameArr[4].first = true;
        var correctName = mainService.setServer(4);
        console.log('Winner',correctName);
      }
      //change for both view(scope) and data(service) MVC
      //change team first key/prop
      //write fn on service to find correct team, fn takes in an num, what number ?
      console.log('loser',$scope.chooser.name);
    }

  };





  ///////////////
  //CTRL FOR GAME//
  ////////////////
  $scope.teamOneBool = false;
  $scope.teamTwoBool = false;
  $scope.service = mainService.getService();
  if($scope.service === 'teamOne'){
    $scope.teamOneBool = !$scope.teamOneBool;
  }else if($scope.service === 'teamTwo'){
    $scope.teamTwoBool = !$scope.teamTwoBool;
  }
  console.log($scope.service,'service');

  if($scope.gameArr[1] && $scope.gameArr[2]){
    $scope.pointType = $scope.gameArr[2];
    $scope.matchTotal = $scope.gameArr[1];
  }

  //add score
  $scope.addScore = function(str){
    //check pointype
    /////////////////////////////
    ////////team one////////////
    ////////////////////////////
    if(str === 'teamone'){
      $scope.teamOneScore++;
      //check to see if we need to increment match win, did they win
      if($scope.teamOneScore > $scope.teamTwoScore+1 && $scope.teamOneScore > $scope.pointType-1){
        $scope.gameArr[3].matchWins+=1;
        swal($scope.gameArr[3].name+' WINS game!!!!');
        $scope.teamOneScore = 0;
        $scope.teamTwoScore = 0;
        totalPoint = 0;
        $scope.gameArr = mainService.getGameArr();
      }
      //see if player wins
      if($scope.gameArr[3].matchWins === $scope.matchTotal-1){
        swal($scope.gameArr[3].name+' WINS Match!!!!');
        mainService.resetArr();
        $state.go('home');
      }
    }
/////////////////////////////
////////team two////////////
////////////////////////////
    if(str === 'teamtwo'){
      $scope.teamTwoScore++;
      if($scope.teamTwoScore > $scope.teamOneScore+1 && $scope.teamTwoScore > $scope.pointType-1){
        $scope.gameArr[4].matchWins+=1;
        swal($scope.gameArr[4].name+' WINS game!!!!');
        $scope.teamOneScore = 0;
        $scope.teamTwoScore = 0;
        totalPoint = 0;
        $scope.gameArr = mainService.getGameArr();
        //see if player wins
        if($scope.gameArr[4].matchWins === $scope.matchTotal-1){
          swal($scope.gameArr[4].name+' WINS match!!!!');
          mainService.resetArr();
          $state.go('home');
        }
      }
    }

    // both teams
    //adding up correct score after point is made
    totalPoint = $scope.teamOneScore + $scope.teamTwoScore;

    if ($scope.gameArr[2] === 11 && totalPoint >= 20) {
      $scope.teamOneBool = !$scope.teamOneBool;
      $scope.teamTwoBool = !$scope.teamTwoBool;
    }else if ($scope.gameArr[2] === 11 && totalPoint%2 === 0) {
      $scope.teamOneBool = !$scope.teamOneBool;
      $scope.teamTwoBool = !$scope.teamTwoBool;
    }

    if ($scope.gameArr[2] === 21 && totalPoint >= 40) {
      $scope.teamOneBool = !$scope.teamOneBool;
      $scope.teamTwoBool = !$scope.teamTwoBool;
    }else if ($scope.gameArr[2] === 21 && totalPoint%5 === 0) {
      $scope.teamOneBool = !$scope.teamOneBool;
      $scope.teamTwoBool = !$scope.teamTwoBool;
    }
  }//add fn closing

});//closing
