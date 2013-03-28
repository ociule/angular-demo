var intensity = (function () {
  var width = 12;
  var height = 12;

  var intensities = intensity = Array(height);
  for (var i=0; i < height; i++) {
    intensities[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

    var increase = function(data) {
        intensities[data.y][data.x] += 1;
        intensities[data.y][data.x] %= 255;
    }

    var get = function() {
        return intensities;
    }
    return { get: get, increase: increase};
}());

// export function for listening to the socket
module.exports = function (socket) {

  // send the new user their name and a default room 
  socket.emit('init', {
    intensities: intensity.get()
  });

  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
        text: data.message,
    });
  });

  socket.on('intensity:increase', function (data) {
    intensity.increase(data);
    socket.broadcast.emit('intensity:increase', data);
  });
  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
  });
};
