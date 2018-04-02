function GameManager(options) {

    options = (options instanceof Object) ? options : {};

    var socket = options.socket;
    var EVENTS = options.EVENTS;

    $('#shot_game').hide();

    $('#join_game').on('click', function() {
        socket.emit(EVENTS.USER_JOIN_GAME);
    });
    $('#leave_game').on('click', function() {
        socket.emit(EVENTS.USER_LEAVE_GAME);
    });
    $('#shot_game').on('click', function() {
        socket.emit(EVENTS.GAME_SHOT);
    });

    socket.on(EVENTS.USER_JOIN_GAME, function(result) {
        if (result) {
            $('#shot_game').show();
        }
    });
    socket.on(EVENTS.GAME_SHOT, function(result) {
        console.log(result);
    });


}