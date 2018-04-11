var q = require('q');

function User(id, name, login) {
	this.id = id;
	this.name = name;
	this.login = login;
}

function UserManager(options) {
	options = (options instanceof Object) ? options : {};
	var io = options.io;
	var SOCKET_EVENTS = options.SOCKET_EVENTS;
	var TRIGGER_EVENTS = options.TRIGGER_EVENTS;
	var db = options.db;
	var trigger = options.trigger;

	var users = {};

	function getUser(id) {
		return (users[id]) ? users[id] : null;
	}

	function checkLogin(login) {
		return db.uniqueUser(login);
	}

	function registerUser(data) {
		return db.setUser(data.nickname, data.login, data.password);
	}

	function userLogin(id, data) {
		if (data && data.login && data.password) {
			return db.getUser(data.login, data.password).then(function (user) {
				if (user) {
                    users[id] = new User(id, user.name, user.login, user.password);
                    return users[id];
                }
                return "No such user in database";
			});
		}
		return null;
	}

	function userLogout(id) {
		delete users[id];
		return true;
	}

	function init() {
		io.on('connection', function (socket) {
			console.log('a user connected into userManager', socket.id);

			socket.on(SOCKET_EVENTS.USER_REGISTERED, function (data) {
				checkLogin(data.login).then(function (check) {
					console.log(check);
					if (check) {
                        socket.emit(SOCKET_EVENTS.USER_REGISTERED, "User with this login is already exsists");
					} else {
						socket.emit(SOCKET_EVENTS.USER_REGISTERED, registerUser(data))
					}
				});
			});

			socket.on(SOCKET_EVENTS.USER_LOGIN, function (data) {
                userLogin(socket.id, data).then(function (data) {
                    socket.emit(SOCKET_EVENTS.USER_LOGIN, data);
				});
			});

			socket.on(SOCKET_EVENTS.USER_LOGOUT, function (data) {
				socket.emit(SOCKET_EVENTS.USER_LOGOUT, userLogout(socket.id));
			});

			socket.on('disconnect', function () {
				userLogout(socket.id);
			});
		});

		trigger.subscribe(TRIGGER_EVENTS.GET_USER, getUser);
	}
	init();
}

module.exports = UserManager;