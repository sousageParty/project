var db = require('../../DataBase/queries');

function User(id, name, login) {
	this.id = id;
	this.name = name;
	this.login = login;
}

function UserManager(options) {
	options = (options instanceof Object) ? options : {};
	var io = options.io;
	var EVENTS = options.SOCKET_EVENTS;

	var users = {};

	function NewUser(id, data){
		return db.uniqueUser(data.login).then(function (data) {	
			return data;
		});
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

			socket.on(EVENTS.USER_REGISTERED, function (data) {
				socket.emit(EVENTS.USER_REGISTERED, NewUser(socket.id, data));
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
	}
	init();
}

module.exports = UserManager;