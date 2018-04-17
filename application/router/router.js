var express = require('express');
var router = express.Router();

var calc = require('../calc');

router.get('/myFirstAPI', function (req, res) {
    res.send('верный путь');
});

router.get('/vm-21/areaSS', function(req, res) {
    var F; eval('F = function (x) { return ' + req.query.f + '; }');
    var G; eval('G = function (x) { return ' + req.query.g + '; }');
    var method = req.query.method || 'rects';
    if (F instanceof Function && G instanceof Function) {
        try {
            F(0);
            G(0);
            return res.send({ result: calc.squares(F, G, method)});
        } catch (e) {
            return res.send('functions is not calculate');
        }
    }
    res.send('wrong parameters');
});


router.get('/*', function (req, res) {
    res.send('неверный путь');
});

module.exports = router;