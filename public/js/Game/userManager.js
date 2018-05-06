function UserManager(options) {

    options = (options instanceof Object) ? options : {};

    var user;

    var socket = options.socket;
    var EVENTS = options.EVENTS;
    var SELECTORS = options.SELECTORS;

    var span = "<span style='color: green; text-align: center;'>" + "Success! Now you can LogIn!" + "</span>";

    function showPage(page) {
        $('.first-page-js').hide();
        $('.second-page-js').hide();
        $('.third-page-js').hide();
        $('.' + page).show();
    }

    this.showPages = function (page) {
        showPage(page);
    };

    function showLoginTab() {
        SELECTORS.tabContent.hide();
        SELECTORS.tabContent.removeClass('active-content');
        $('.tabs').removeClass('active');
        SELECTORS.errorBlock.empty();
        $('.first-tab').addClass('active-content');
        $('.first-tab').show();
        $($('.tabs')[0]).addClass('active');
    }

    function clearInputs() {
        SELECTORS.signInInputs.val("");
        SELECTORS.authInputs.val("");
    }

    //Вешаем события на кнопки. Генерируем события, касающиеся авторизации/регистрации здесь!
    function eventHandler() {
        $('.btn-signIn-js').on('click', function () {//кнопка "Войти"
            var login = $(SELECTORS.signInInputs[0]).val();
            var password = $(SELECTORS.signInInputs[1]).val();
            if (login && password) {
                socket.emit(EVENTS.USER_LOGIN, { login: login, password: password });
            }
        });
        $('.btn-auth-js').on('click', function () {//кнопка "Зарегистрироваться"
            var login = $(SELECTORS.authInputs[0]).val();
            var nickname = $(SELECTORS.authInputs[1]).val();
            var password = $(SELECTORS.authInputs[2]).val();
            if (login && password && nickname) {
                socket.emit(EVENTS.USER_REGISTERED, { login: login, password: password, nickname: nickname });
            }
        });
    }

    //подписываемся на все сокеты, касающиеся авторизации здесь!
    function socketHandler() {
        //логин
        socket.on(EVENTS.USER_LOGIN, function (data) {
            if (data instanceof Object) {
                clearInputs();
                showPage('second-page-js');
                user = data;
            } else {
                clearInputs();
                SELECTORS.errorBlock.empty();
                SELECTORS.errorBlock.append(data);
            }
        });
        //регистрация
        socket.on(EVENTS.USER_REGISTERED, function (data) {
            if ("string" === typeof(data)) {
                clearInputs();
                SELECTORS.errorBlock.empty();
                SELECTORS.errorBlock.append(data);
            } else {
                clearInputs();
                SELECTORS.errorBlock.empty();
                showLoginTab();
                SELECTORS.errorBlock.append(span);
            }
        });
    }

    this.getUser = function () { return user; };

    function init() {
        showPage('first-page-js');
        eventHandler();
        socketHandler();
    }
    init();
}