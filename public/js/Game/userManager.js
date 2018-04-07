function UserManager(options) {

    options = (options instanceof Object) ? options : {};

    var socket = options.socket;
    var EVENTS = options.EVENTS;
    var signInInputs = $('.signIn-input-js');
    var authInput = $('.auth-input-js');

    function showPage(page) {
        $('.first-page-js').hide();
        $('.second-page-js').hide();
        $('.' + page).show();
    }

    $('.btn-signIn-js').on('click', function () {
        var login = $(signInInputs[0]).val();
        var password = $(signInInputs[1]).val();
        if (login && password) {
            socket.emit(EVENTS.USER_LOGIN, { login: login, password: password });
        }
    });


    socket.on(EVENTS.USER_LOGIN, function (data) {
        if (data) {
            showPage('second-page-js');
        } else {
            alert('error!');
        }
    });

    $('.btn-auth-js').on('click', function () {
        var login = $(authInput)[0].val();
        var nickname = $(authInput)[1].val();
        var password = $(authInput)[2].val();
        if (login && password && nickname) {
            socket.emit(EVENTS.USER_REGISTERED, { login: login, password: password, nickname: nickname });
        }
    });

    showPage('first-page-js');

}