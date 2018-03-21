var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public')); //apply static files
var router = require('./Application/router/router');
app.use(router);

var SOCKET_EVENTS = {
    USER_LOGIN: 'user login',
    USER_LOGOUT: 'user logout',
    USER_START_GAME: 'user start game'
};

var MEDIATOR_EVENTS = {
  SOME: 'some',
  TEST: 'test'
};

var Mediator = require('./Application/modules/mediator');

var auth = require('./public/js/auth/auth');
var mediator = new Mediator({events: MEDIATOR_EVENTS});
var UserManager = require('./Application/modules/user/userManager');

mediator.subscribe(MEDIATOR_EVENTS.some, function (data) {
    console.log(data, 'Hello! ');
});
mediator.call(MEDIATOR_EVENTS.some, 123123);

var userManager = new UserManager({io: io, SOCKET_EVENTS: SOCKET_EVENTS});

http.listen(3000, function () {
    console.log('server start ap port 3000');
});