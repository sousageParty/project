var FUNC = {};

function rectCalc (F, G, A, B) {
    if (A > B) {
        var C = A;
        A = B;
        B = C;
    }
    var dx = (B - A) / 1000;
    var s1 = 0;
    var s2 = 0;
    var x = A;

    while(x < B) {
        s1 += F(x) *dx;
        s2 += G(x) *dx;
        x += dx;
    }
    return Math.abs(s2 - s1);

}

function trapezeCalc(F, G, A, B) {
    return 1;
}

function pointsCalc(F, G, A, B) {
    return 2;
}

FUNC.squares = function (F, G, A, B, method) {
   switch (method) {
       case 'points' : return pointsCalc(F, G, A, B); break;
       case 'rects' : return rectCalc(F, G, A, B); break;
       case 'trapeze' : return trapezeCalc(F, G, A, B); break;
       default: return pointsCalc(F, G, A, B); break;
   }
};

module.exports = FUNC;