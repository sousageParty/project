function UserManager(options) {

    options = (options instanceof Object) ? options : {};

    var socket = options.socket;
    var EVENTS = options.EVENTS;

    $('#login').on('click', function() {
        socket.emit(EVENTS.USER_LOGIN, {
            name: 'Marat',
            login: 'Spice',
            password: '123'
        });
    });

}