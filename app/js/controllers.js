'use strict';

/* Controllers */


function DemoCtrl($scope, $routeParams, socket) {
  console.log("Starting demo ...")

  $scope.$on("$destroy", function () { console.log("bye bye "); });

  socket.on('init', function (data) {
    console.log("init \""+ data.name);
    $scope.name = data.name;
  });

  socket.on('send:message', function (message) {
    if (message.room == $scope.room)
    $scope.messages.push(message);
  });


  // Methods published to the scope
  // ==============================

  var width = 12;
  var height = 12;
  $scope.intensity = Array(height);
  for (var i=0; i < height; i++) {
    $scope.intensity[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  $scope.increaseIntensity = function () {
    socket.emit('intensity:increase', {
      message: $scope.message
    });

    // add the message to our model locally
    $scope.messages.push({
      user: $scope.name,
      text: $scope.message
    });

    // clear message box
    $scope.message = '';
  };  
  $scope.message = 'test';

}
//DemoCtrl.$inject = ['$routeParams', 'socket'];
