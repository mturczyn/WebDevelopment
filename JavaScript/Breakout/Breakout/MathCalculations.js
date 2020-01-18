// Po za³adowaniu dokumentów w jednym HTMLu, zmienne jednego skryptu
// powinny byc widoczne w drugim.
function rotateVector(vector, degree, antiClockwise) {
    // Convert to radians.
    degree *= Math.PI / 180;
    let sin = Math.sin(degree);
    let cos = Math.cos(degree);

    if (antiClockwise) {
        vector.x = cos * vector.x - sin * vector.y;
        vector.y = sin * vector.x + cos * vector.y;
    } else {
        vector.x = cos * vector.x + sin * vector.y;
        vector.y = -sin * vector.x + cos * vector.y;
    }

    return vector;
}