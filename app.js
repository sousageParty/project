var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public')); // apply static files
var router = require('./application/router/router');
app.use(router); // use remote router

var Mediator = require('./application/modules/mediator');
var Trigger = require('./application/modules/trigger');
var DB = require('./application/modules/db/db');
var UserManager = require('./application/modules/user/userManager');
var GameManager = require('./application/modules/game/gameManager');

var SOCKET_EVENTS = {
	USER_LOGIN: 'user login',
	USER_LOGOUT: 'user logout',
	USER_REGISTERED: 'user registered',
	USER_JOIN_GAME: 'user join game',
	USER_LEAVE_GAME: 'user leave game',
    GAME_UPDATE_SCENE: 'game update scene',
    GAME_PUSH_ROCKET: 'game push rocket'
};

var TRIGGER_EVENTS = {
	GET_USER: 'get user',
};

var MEDIATOR_EVENTS = {
	SOME: 'some',
	Test: 'test',
};

var mediator = new Mediator({ events: MEDIATOR_EVENTS });
var trigger = new Trigger();
var db = new DB();
var userManager = new UserManager({ io: io, SOCKET_EVENTS: SOCKET_EVENTS, TRIGGER_EVENTS: TRIGGER_EVENTS, db: db, mediator: mediator, trigger: trigger });
var gameManager = new GameManager({ io: io, SOCKET_EVENTS: SOCKET_EVENTS, TRIGGER_EVENTS: TRIGGER_EVENTS, db: db, mediator: mediator, trigger: trigger });

http.listen(3000, function () {
	console.log('server start at port 3000');
});