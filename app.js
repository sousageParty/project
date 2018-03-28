var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public')); // apply static files
var router = require('./application/router/router');
app.use(router); // use remote router

var Mediator = require('./application/modules/mediator');
var UserManager = require('./application/modules/user/userManager');

var SOCKET_EVENTS = {
	USER_LOGIN: 'user login',
	USER_LOGOUT: 'user logout',
	USER_REGISTERED:'user registered',
	USER_START_GAME: 'user start game'
};

var MEDIATOR_EVENTS = {
	SOME: 'some',
	Test: 'test'
};

var mediator = new Mediator({ events: MEDIATOR_EVENTS });
var userManager = new UserManager({ io: io, SOCKET_EVENTS: SOCKET_EVENTS });

mediator.subscribe(MEDIATOR_EVENTS.SOME, function (data) {
	console.log(data, "Marat!!! space");
});
mediator.call(MEDIATOR_EVENTS.SOME, 12345);


http.listen(3000, function () {
	console.log('server start at port 3000');
});