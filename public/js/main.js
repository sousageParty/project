window.onload = function () {

    var socket = io('http://localhost:3000');

    var EVENTS = {
        USER_LOGIN: 'user login',
        USER_LOGOUT: 'user logout',
        USER_REGISTERED: 'user registered',
        USER_JOIN_GAME: 'user join game',
        USER_LEAVE_GAME: 'user leave game',
        GAME_PUSH_ROCKET: 'game push rocket',
        GAME_UPDATE_SCENE: 'game update scene'
    };
    var SELECTORS = {
        tabs: $('.tabs'),
        tabContent: $('.tab-content'),
        sliders: $('.ranges'),
        signInInputs: $('.signIn-input-js'),
        authInputs: $('.auth-input-js'),
        errorBlock: $('.error-js')
    };

    var userManager = new UserManager({ socket: socket, EVENTS: EVENTS, SELECTORS: SELECTORS });
    var gameManager = new GameManager({ socket: socket, EVENTS: EVENTS, callback: { getUser: userManager.getUser, showPage: userManager.showPages }});

    function initUI() {
        new Tabs({ SELECTORS: SELECTORS });
        new Ranges({ SELECTORS: SELECTORS });
    }
    initUI();
};
