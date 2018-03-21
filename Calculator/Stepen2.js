function Gaus (_koefs) {
    var koefs = _koefs;
    /*if (koefs.a1 === 1) {
        koefs.a1 *= -koefs.a2;
        koefs.b1 *= -koefs.a2;
        koefs.c1 *= -koefs.a2;

        koefs.a2 += koefs.a1;
        koefs.b2 += koefs.b1;
        koefs.c2 += koefs.c1;

        var y = koefs.c2/koefs.b2;
        var x = (koefs.c1 - (koefs.b1*koefs.c2)/koefs.b2)/koefs.a1;

        console.log(x,y);
    } else {
*/
        koefs.a1 /= koefs.a1;
        koefs.b1 /= koefs.a1;
        koefs.c1 /= koefs.a1;

        koefs.a1 *= -koefs.a2;
        koefs.b1 *= -koefs.a2;
        koefs.c1 *= -koefs.a2;

        koefs.a2 += koefs.a1;
        koefs.b2 += koefs.b1;
        koefs.c2 += koefs.c1;

        var y = koefs.c2/koefs.b2;
        var x = (koefs.c1 - (koefs.b1*koefs.c2)/koefs.b2)/koefs.a1;

        console.log(x,y);

  //  }

}

module.exports = Gaus;
