window.onload = function () {
    var socket = io('http://localhost:3000');

    var EVENTS = {
        USER_LOGIN: 'user login',
        USER_LOGOUT: 'user logout',
        USER_REGISTERED:'user registered',
        USER_START_GAME: 'user start game'
    };
    $("#inputLogin").change(function(){
        socket.emit(EVENTS.USER_REGISTERED, {
            login: $("#inputLogin").val()
        });
    });
    $("#Log_in").click(function () {  
        socket.emit(EVENTS.USER_LOGIN, {
            name: $("#inputName").val(),
            login: $("#inputLogin").val(),
            password: $("#inputPassword").val()
        });
    });
    socket.on(EVENTS.USER_REGISTERED,function(data){
        console.log($('#hint'));
        console.log(data);
        if (data == null){
            $('#hint').show();
            $('#hint').html("Этот логин не заренистрирован, нажав кнопку войти вы зарегистрируете пользователя"); 
        }else
        $('#hint').hide();
    });

    socket.on(EVENTS.USER_LOGIN, function (data) {
        console.log(data);
        if (data == null) {
            $("#hint_1")[0].innerHTML = "Вы не ввели логин и(или) пароль";
        }
       
    });
    function LogIn(){
        $('#registration').hide();
    }
    LogIn();
   
};	
