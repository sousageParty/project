function GameManager(options) {

    options = (options instanceof Object) ? options : {};
    var callback = options.callback || {};
    var getUserCallback = (callback.getUser instanceof Function) ? callback.getUser : function () {};
    var showPageCallback = (callback.showPage instanceof Function) ? callback.showPage : function () {};
    var socket = options.socket;
    var EVENTS = options.EVENTS;

    var color = "rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")";

    var user;
    var view;

    function joinGame() {
        user = getUserCallback();
        var mass = $('.mass').html() - 0;
        var center = $('.center').html() - 0;
        var speed = $('.speed').html() - 0;
        var radius = $('.radius').html() - 0;
        if (mass && center && speed && radius) {
            socket.emit(EVENTS.USER_JOIN_GAME, { mass: mass, center: center, speed: speed, radius: radius });
        }
    }

    //Вешаем события. Генерируем события, касающиеся игры здесь!
    function eventHandler() {
        $('.ranges').on('change', function () {
            view = null;
            view = new View($('.watchExample'), false);
            view.createPlanet($('.radius').html() - 0, { x: $('.center').html() - 0, y: 0, z: 0 }, { x: 5, y: 0, z: 3 }, color, $('.speed').html() - 0);
        });
        $('.join-game-btn-js').on('click', function() {//присоединиться к игре
            joinGame();
        });
        $('.leave-game-btn-js').on('click', function() {//выйти из игры
            socket.emit(EVENTS.USER_LEAVE_GAME);
        });
    }

    //подписываемся на все сокеты, касающиеся игры здесь!
    function socketHandler() {
        socket.on(EVENTS.USER_JOIN_GAME, function(result) {//присоединиться к игре
            if (result) {
                showPageCallback('third-page-js');
                view = null;
                view = new View($('.third-page-js'), true);
            }
        });
        socket.on(EVENTS.GAME_UPDATE_SCENE, function (data) {//обновить сцену
            //console.log(data);
            if (!($.isEmptyObject(data.planets))) {
                for(var key in data.planets) {
                    view.createPlanet(data.planets[key].radius, data.planets[key].position, data.planets[key].face, data.planets[key].speed);
                }
            }
        });
    }



    function init() {
        eventHandler();
        socketHandler();
    }
    init();
}