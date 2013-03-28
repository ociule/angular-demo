Tech demo to demonstrate Angular, websockets via socket.io, nodejs and express.

The demo is a shared mouse position heatmap. The more you hover a grid rectangle, the bluer it gets. But the heatmap is shared among all connected users: all their mouse positions get summed.

### Running on Heroku
Heroku does not support websockets, so we'll change socket.io transport to xhr-longpoll via the HEROKU environment variable.
You must run 'heroku config:add HEROKU=1' for this.
You can also setup NODE\_ENV=production via the same.
