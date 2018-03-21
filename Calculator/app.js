var Stepen2 = require('./Stepen2');
var Stepen3 = require('./Stepen3');
var min = 1, max = 100;

var koefs1 = {
    a1 : 1, //Math.random() * (max - min) + min,
    a2 : 3,//Math.random() * (max - min) + min,
    a3 : 2,//Math.random() * (max - min) + min,
    b1 : 5,//Math.random() * (max - min) + min,
    b2 : 7,//Math.random() * (max - min) + min,
    b3 : 8,//Math.random() * (max - min) + min,
    f1 : 8,//Math.random() * (max - min) + min,
    f2 : 4,//Math.random() * (max - min) + min,
    f3 : -5,//Math.random() * (max - min) + min,
    c1 : -7,//Math.random() * (max - min) + min,
    c2 : 6,//Math.random() * (max - min) + min,
    c3: 11//Math.random() * (max - min) + min
};

var koefs2 = {
    a1 : 1, //Math.random() * (max - min) + min,
    a2 : 3,//Math.random() * (max - min) + min,
    a3 : 2,//Math.random() * (max - min) + min,
    b1 : 5,//Math.random() * (max - min) + min,
    b2 : 7,//Math.random() * (max - min) + min,
    b3 : 8,//Math.random() * (max - min) + min,
    f1 : 8,//Math.random() * (max - min) + min,
    f2 : 4,//Math.random() * (max - min) + min,
    f3 : -5,//Math.random() * (max - min) + min,
    c1 : -7,//Math.random() * (max - min) + min,
    c2 : 6,//Math.random() * (max - min) + min,
    c3: 11//Math.random() * (max - min) + min
};

var determinant = {
    opr1 : koefs1.a1 * koefs1.b2 - koefs1.b1 * koefs1.a1,
    opr2 : koefs1.c1 * koefs1.b2 - koefs1.b1 * koefs1.c2,
    opr3 : koefs1.a1 * koefs1.c2 - koefs1.c1 * koefs1.a2
};


if (determinant.opr1 === 0 && (determinant.opr2 === !0 || determinant.opr3 === !0)) {
    console.log('Решений нет');
} else {
    var calc1 = new Stepen2(koefs1);

    var calc2 = new Stepen3(koefs2);
}

