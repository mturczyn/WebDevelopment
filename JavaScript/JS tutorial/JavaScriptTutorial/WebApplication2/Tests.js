// Plik JavaScript można pisać jako zwykły skrypt uruchamiający po kolei instrukcje.
alert("Let the testing begin...");
describe("pow", function () {
    it("2 raised to consecutive powers", function () {
        assert.equal(pow(2, 3), 8);
        assert.equal(pow(2, 2), 4);
        assert.equal(pow(2, 1), 2);
        assert.equal(pow(2, 0), 1);
    });

    it("3 raised to consecutive powers", function () {
        assert.equal(pow(3, 4), 81);
    });

    it("for negative n the result is NaN", function () {
        assert.isNaN(pow(2, -1));
    });

    it("for non-integer n the result is NaN", function () {
        assert.isNaN(pow(2, 1.5));
    });
    // Tylko ten test bedzie wykonany.
    it.only("Raises x to the power n", function () {
        let x = 5;
        let result = x;
        result *= x;
        assert.equal(pow(x, 2), result);
    });


    //let pattern = /\*/;
});