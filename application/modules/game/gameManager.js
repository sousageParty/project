var Game = require('./game');

function GameManager(options) {
    options = (options instanceof Object) ? options : {};
	var io = options.io;
	var SOCKET_EVENTS = options.SOCKET_EVENTS;
	var TRIGGER_EVENTS = options.TRIGGER_EVENTS;
    var db = options.db;
    var trigger = options.trigger;

    var game;

    function updateScene(scene) {
        io.local.emit(SOCKET_EVENTS.GAME_UPDATE_SCENE, scene);
    }

    function init() {

        game = new Game({ callback: {
                updateScene: updateScene
            } });

        io.on('connection', function (socket) {
			console.log('a user connected into gameManager', socket.id);

			var user;

            socket.on(SOCKET_EVENTS.USER_JOIN_GAME, function(data) {
                user = trigger.call(TRIGGER_EVENTS.GET_USER, socket.id);
                if (user && data) {
                    game.join(user, data);
                }
                socket.emit(SOCKET_EVENTS.USER_JOIN_GAME, !!(user));
            });

            socket.on(SOCKET_EVENTS.USER_LEAVE_GAME, function(data) {
                game.leave(user);
                user = null;
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