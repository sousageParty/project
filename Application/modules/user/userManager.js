function User(id, name , login) {
    this.id = id;
    this.name = name;
    this.login = login;
}

function UserManager (options) {

    options = (options instanceof Object) ? options : {};
    var io = options.io;
    var EVENTS = options.SOCKET_EVENTS;

    var users = {};

    function userLogin(data) {
        if (data && data.name && data.login) {
            users[socket.id] = new User(socket.id, data.name, data.login);
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
            console.log('a user connected into userManager' ,socket.id);

            socket.on(EVENTS.USER_LOGIN, function (data) {
                socket.emit(EVENTS.USER.LOGIN, userLogin(socket.id, data));
            });
            socket.on(EVENTS.USERS_LOGOUT, function (data) {
                socket.emit(EVENTS.USER.LOGOUT, userLogout(socket.id, data))
                });
            socket.on('disconnect', function () {
                userLogout(socket.id);
            });
        });
    }
    init();
}

module.exports = UserManager;