var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/project/areaSS', function(req, res){
    var A = req.query.A;
    var B = req.query.B;
    var F; eval('F = function (x) {return ' + req.query.f + ';}');
    var G; eval('G = function (x) {return ' + req.query.g + ';}');
    var method = req.query.method || 'points';
    if (!isNaN(A - 0) && !isNaN(B - 0) && F instanceof Function && G instanceof Function) {
        try {
            F(0);
            G(0);
            return res.send('ok');
        } catch (e) {
            return res.send('function in not calculate');
        }
    }
    res.send('wrong parameters');
});

app.get('/project/:name/:soname', function (req, res) {
    var name = req.params.name;
    var soname = req.params.soname;
    res.send('Hello, ' +((name) ? name : 'unknow') + ' ' + ((soname) ? soname : 'Unknow') + '  sosiski!!!');

});

app.all('/*', function(req, res){
    res.send('wrong way!');
});

var server = app.listen(3000, function () {
        console.log('server start ap port 3000');
});

