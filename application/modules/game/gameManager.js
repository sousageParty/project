var Game = require('./game');

function GameManager(options) {
    options = (options instanceof Object) ? options : {};
	var io = options.io;
	var EVENTS = options.SOCKET_EVENTS;
    var db = options.db;
    var trigger = options.trigger;

    var game;

    function init() {

        game = new Game();

        io.on('connection', function (socket) {
			console.log('a user connected into gameManager', socket.id);

			var user;
            
            socket.on(EVENTS.USER_JOIN_GAME, function(data) {
                user = trigger.call('getUser', socket.id);
                socket.emit(EVENTS.USER_JOIN_GAME, !!(user));
                if (user) {
                    game.join(user);
                }
            });

            socket.on(EVENTS.USER_LEAVE_GAME, function(data) {
                game.leave(user);
                user = null;
            });

            socket.on(EVENTS.GAME_SHOT, function(data) {
                io.local.emit(EVENTS.GAME_SHOT, game.fire(socket.id));
            });

			socket.on('disconnect', function () {
                game.leave(user);
                user = null;
			});
		});
    }
    init();
}

module.exports = GameManager;