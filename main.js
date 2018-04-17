var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
var router = require('./application/router/router');
app.use(router);

http.listen(3000, function () {
    console.log('server start at port 3000');
});