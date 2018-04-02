var q = require('q');

function User(id, name, login) {
	this.id = id;
	this.name = name;
	this.login = login;
}

function UserManager(options) {
	options = (options instanceof Object) ? options : {};
	var io = options.io;
	var EVENTS = options.SOCKET_EVENTS;
	var db = options.db;
	var trigger = options.trigger;

	var users = {};

	/*function userAuth(data) {
		var deffered = q.defer();
		if (data && data.login && data.password) {
			db.userAuth(data.login, data.password).then(function (data) {
				deffered.resolve(data);
			});
		}
		return deffered.promise;
	}*/

	function getUser(id) {
		return (users[id]) ? users[id] : null;
	}

	function checkLogin(data) {
		var deffered = q.defer();
		db.uniqueUser(data.login).then(function (data) {
			deffered.resolve(data);
		});
		return deffered.promise;
	}

	function registerUser(data, check_Login) {
		if (check_Login == null) {
			db.setUser(data.name, data.login, data.password);
			return true;
		} else
			return false;
	}

	function userLogin(id, data) {
		if (data && data.name && data.login && data.password) {
			users[id] = new User(id, data.name, data.login);
			return users;
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

			/*socket.on(EVENTS.USER_AUTHORIZED, function (data) {
				userAuth(data).then(function (data) {
					socket.emit(EVENTS.USER_AUTHORIZED, data);
				});
			});*/

			socket.on(EVENTS.USER_REGISTERED, function (data) {
				checkLogin(data).then(function (check_Login) {
					socket.emit(EVENTS.USER_REGISTERED, registerUser(data, check_Login));
				});
			});

			socket.on(EVENTS.USER_LOGIN, function (data) {
				socket.emit(EVENTS.USER_LOGIN, userLogin(socket.id, data));
			});

			socket.on(EVENTS.USER_LOGOUT, function (data) {
				socket.emit(EVENTS.USER_LOGOUT, userLogout(socket.id));
			});

			socket.on('disconnect', function () {
				userLogout(socket.id);
			});
		});

		trigger.subscribe('getUser', getUser);
	}
	init();
}

module.exports = UserManager;