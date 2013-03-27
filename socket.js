// Keep track of which names are used so that there are no duplicates
var userNamesByRoom = (function () {
  var names = {};

  var claim = function (name) {
    var found = false;
    for (room in names) {
      if (names[name]) {
        found = true;
        break;
      }
    }
    if (!name || found) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function (room) {
    if (!room) { console.log("userNamesByRoom.get without room parameter"); return []; }
    var res = [];
    for (user in names[room]) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    for (room in names)
      if (names[room][name]) {
        delete names[room][name];
        return;
      }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

// export function for listening to the socket
module.exports = function (socket) {
  var name = userNamesByRoom.getGuestName();

  // send the new user their name and a default room 
  socket.emit('init', {
    name: name,
    users: userNamesByRoom.get(room)
  });

  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
        user: name,
        text: data.message,
        room: room
    });
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    userNamesByRoom.free(name);
  });
};
