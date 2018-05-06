var express = require('express');
var router = express.Router();

//var func = require('../squares');

/*router.get('/vm-21/areaSS', function(req, res) {
	var A = req.query.A - 0;
	var B = req.query.B - 0;
	var F; eval('F = function (x) { return ' + req.query.f + '; }');
	var G; eval('G = function (x) { return ' + req.query.g + '; }');
	var method = req.query.method || 'points';
	if (!isNaN(A) && !isNaN(B) && F instanceof Function && G instanceof Function) {
		try {
			F(0);
			G(0);
			return res.send({ result: func.squares(F, G, A, B, method)});
		} catch (e) {
			return res.send('functions is not calculate');
		}
	}
	res.send('wrong parameters');
});

router.get('/vm-21/:name/:soname', function(req, res) {
	var name = req.params.name;
	var soname = req.params.soname;
	res.send('Hello, ' + ((name) ? name : 'unknown ') + ' ' + ((soname) ? soname : 'Unknown ') + ' sosiska !!!');
});*/

router.all('/*', function(req, res) {
  res.send('wrong way');
});
module.exports = router;