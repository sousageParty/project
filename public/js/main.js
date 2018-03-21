window.onload = function () {
    var socket = io('http://localhost:3000');

    var EVENTS = {
        USER_LOGIN: 'user login',
        USER_LOGOUT: 'user logout',
        USER_START_GAME: 'user start game'
    };


    socket.emit(EVENTS.USER.LOGIN, {name: 'Vitaly', login: 'Gorodilof'});

    socket.on(EVENTS.USER.LOGIN, function (data) {
        console.log(data);
    });
};