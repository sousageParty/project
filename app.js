const express = require('express');
const Squares = require('./data/squares');

const app = express();
const squares = new Squares();

app.use(express.static(__dirname + '/public'));

app.get('/vm-21/areaSS', (req, res) => {
    let A = req.query.A;
    let B = req.query.B;
    let F; eval('F = function (x) { return ' + req.query.f +'; }');
    let G; eval('G = function (x) { return ' + req.query.g +'; }');
    let method = req.query.method || 'прямоугольник';
    if (!isNaN(A - 0) && !isNaN(B - 0) && F instanceof Function && G instanceof Function) {
        try {
            return res.send(squares.calc({a: A, b: B}, {f: F, g: G}, method));
        } catch(e) {
            res.send('err');
        }
    }
    res.send('wrong params');
});

app.get('/vm-21/:name/:soname', (req, res) => {
    let name = req.params.name;
    let soname = req.params.soname;
    res.send('Hello, ' + ((name) ? name : 'unknown ') + ' ' + ((soname) ? soname : 'unknown ') + ' sosiska!!!');
});

app.all('/*', (req, res) => {
    res.send('wrong way');
});

const server = app.listen(3000, () => {
    console.log('server start at port 3000');
});