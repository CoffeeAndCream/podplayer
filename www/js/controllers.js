angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Chad', id: "chad" },
    { title: 'Miya', id: "miya" },
    { title: 'Kaleigh', id: "kaleigh" },
    { title: 'Lee', id: "lee" },
    { title: "Nancy", id: "nancy"}
  ];
})

.controller('SearchCtrl', function($scope, $stateParams, $sce) {
  var audio = document.getElementById("audio"),
    keyHandler = function (e) {
      switch (e.keyCode) {
        case 32: /// space
          $scope.toggle();
          break;
        case 37:
          $scope.backward();
          break;
        case 39:
          $scope.foreward();
          break;
        case 187:
          $scope.updatePlaybackRate(0.1);
          break;
        case 189:
          $scope.updatePlaybackRate(-0.1);
          break;
      }
    };
  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
  });
  $scope.playlistId = $stateParams.playlistId;
  $scope.trustedUrl = $sce.trustAsResourceUrl("/audio/" + $stateParams.playlistId + ".m4a");
  $scope.backward = function () {
    audio.currentTime -= 30;
  };
  $scope.foreward = function () {
    audio.currentTime += 30;
  };
  $scope.toggle = function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
  $scope.updatePlaybackRate = function (val) {
    $scope.data.playbackRate = parseFloat($scope.data.playbackRate);
    if (val) {
      $scope.data.playbackRate = $scope.data.playbackRate + val;
    }
    if ($scope.data.playbackRate < 0.5) {
      $scope.data.playbackRate = 0.5
    } else if ($scope.data.playbackRate > 3) {
      $scope.data.playbackRate = 3;
    }
    audio.playbackRate = $scope.data.playbackRate;
    $scope.$digest(); /// update slider
  };
  $scope.data = {
    playbackRate: 1.0
  };
  document.addEventListener("keydown", keyHandler);
  $scope.$on("$destroy", function () {
    document.removeEventListener("keydown", keyHandler);
  });
});
