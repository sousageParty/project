var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public')); //подключить статические файлы
var router = require('./application/router/router');
app.use(router); //исп-ть удаленный роутер

var UserManager = require('./application/modules/user/userManager');

var SOCKET_EVENTS = {
    USER_LOGIN: 'user login',
    USER_LOGOUT: 'user logout',
    USER_START_GAME: 'user start game'
};

var userManager = new UserManager({ io: io, SOCKET_EVENTS: SOCKET_EVENTS });

http.listen(3000, function () {
    console.log('server start at port 3000');
});