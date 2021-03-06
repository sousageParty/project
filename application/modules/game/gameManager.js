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
                    var scene = game.join(user, data);
                }
                socket.emit(SOCKET_EVENTS.USER_JOIN_GAME, scene);
            });

            socket.on(SOCKET_EVENTS.USER_LEAVE_GAME, function(data) {
                game.leave(user);
                user = null;
            });

            socket.on(SOCKET_EVENTS.GAME_PUSH_ROCKET, function (data) {
                //{ id: "rocket", idPlanet: "planet", mass: 100, speed: 0.002, position: { x:0, y:0, z:0 } }
                if (user) {
                    socket.emit(SOCKET_EVENTS.GAME_PUSH_ROCKET, game.fireRocket(user, data));
                }
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