'use strict';

/* Controllers */


function DemoCtrl($scope, $routeParams, socket) {
  console.log("Starting demo ...")

  $scope.$on("$destroy", function () { console.log("bye bye "); });

  socket.on('init', function (data) {
    console.log("init \""+ data.intensities);
    $scope.intensities = data.intensities;
  });

  socket.on('intensity:increase', function (data) {
    $scope.intensities[data.y][data.x] += 1;
  });


  // Methods published to the scope
  // ==============================

  // init intensities as empty array
  var width = 12;
  var height = 12;
  //$scope.intensities = Array(height);
  for (var i=0; i < height; i++) {
    //$scope.intensities[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  $scope.increaseIntensity = function (y, x) {
    $scope.intensities[y][x] += 1;

    socket.emit('intensity:increase', {
      x: x,
      y: y,
    });
  }; 

  $scope.intensityToColor = function (intensity) {
    intensity = 255 - intensity % 255;
    var stri = intensity.toString(16);
    if (stri.length == 1) stri = "0" + stri;
    return "#" + stri + "FFFF";
  }
}
//DemoCtrl.$inject = ['$routeParams', 'socket'];
