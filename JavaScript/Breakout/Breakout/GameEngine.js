// Po za³adowaniu dokumentów w jednym HTMLu, zmienne jednego skryptu
// powinny byc widoczne w drugim.
const BALL_RADIUS = 10;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;
const BRICK_ROW_COUNT = 3;
const BRICK_COLUMN_COUNT = 5;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 30;
const EPSILON = 0.000001;
var movementVector = { x: 2.5, y: 2.5 };
var ballPosition;
var paddleX;
var canvas;
var ctx;
var bricks;
var score;


function initializaVariables(cv) {
    score = 0;
    canvas = cv;
    ctx = canvas.getContext("2d");
    paddleX = (canvas.width - PADDLE_WIDTH) / 2;
    // Wylicz wspó³rzêdne pocz¹tkowe.
    ballPosition = {
        x: canvas.width / 2,
        y: canvas.height - 30,
    };

    bricks = [];
    for (var c = 0; c < BRICK_COLUMN_COUNT; c++) {
        bricks[c] = [];
        for (var r = 0; r < BRICK_ROW_COUNT; r++) {
            bricks[c][r] = { x: 0, y: 0, hit: false, };
        }
    }
}

function drawBricks() {
    for (var c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (var r = 0; r < BRICK_ROW_COUNT; r++) {
            if (bricks[c][r].hit) continue;

            var brickX = (c * (BRICK_WIDTH + BRICK_PADDING)) + BRICK_OFFSET_LEFT;
            var brickY = (r * (BRICK_HEIGHT + BRICK_PADDING)) + BRICK_OFFSET_TOP;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
/**
 * Rysuje ko³o na elemencie canvas (u¿ywaj¹c jego kontekstu) w miejscu wskazanym przez wspó³rzêdne.
 */
function draw(game) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Detekcja, czy nie wychodzimy poza "ekran".
    if (ballPosition.x + movementVector.x + BALL_RADIUS > canvas.width || ballPosition.x + movementVector.x - BALL_RADIUS < 0) {
        movementVector.x = -movementVector.x;
    }
    // Sprawdzamy odbicie od naszej paletki.
    collisionDetection(ballPosition.x, ballPosition.y, paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, true);

    if (ballPosition.y + movementVector.y - BALL_RADIUS < 0) {
        movementVector.y = -movementVector.y;
    } else if (ballPosition.y + BALL_RADIUS > canvas.height) {
        alert("GAME OVER");
        document.location.reload();
        //clearInterval(game);
    }

    if (rightPressed) {
        paddleX += 7;
        if (paddleX + PADDLE_WIDTH > canvas.width) {
            paddleX = canvas.width - PADDLE_WIDTH;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    ballPosition.x += movementVector.x;
    ballPosition.y += movementVector.y;

    drawBricks();
    drawBall(ballPosition.x, ballPosition.y);
    drawPaddle();
    drawScore();
    if (brickCollisionDetection(ballPosition.x, ballPosition.y)) {
        alert("YOU WON!");
        document.location.reload();
        //clearInterval(game);
    }
    // Wydajniejsze niz setInterval
    requestAnimationFrame(draw);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function calculateCoordinates() {
}

function brickCollisionDetection(ballX, ballY) {
    let bricksLeft = 0;
    for (var c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (var r = 0; r < BRICK_ROW_COUNT; r++) {
            var b = bricks[c][r];
            if (b.hit) continue;
            b.hit = collisionDetection(ballX, ballY, b.x, b.y, BRICK_WIDTH, BRICK_HEIGHT, false);
            if (b.hit) {
                score++;
                movementVector.x = 1.05 * movementVector.x;
                movementVector.y = 1.05 * movementVector.y;
            }
            bricksLeft++;
        }
    }
    return bricksLeft == 0;
}

function collisionDetection(ballX, ballY, rectX, rectY, rectWidth, rectHeight, rotateOnCollision) {
    // Czasami ³apie, ¿e paletka uderzy³a dwa razy pi³kê, ale to nie mo¿e byæ prawda,
    // bo zawsze odbijamy raz, wiêc aby temu zapobiec, tutaj na sztywno zwracamy false.
    // Jak paletka uderzy o pi³kê to dzia³amy normalnie i ustawiamy t¹ zmienn¹ na true.
    // Ogólnie przybli¿one obliczenia mog¹ tutaj mieæ znaczenie, tak¿e uogólniam mechanizm,
    // ¿e paletka nie mo¿e byc uderzona, jeœli wektor ruchu skierowany jest w górê.:
    // rotateOnCollision = true tylko dla paletki,
    // movementVector.y < 0 - wektor skierowany w górê.
    if (movementVector.y < 0 && rotateOnCollision) {
        return false;
    }

    let nearestRectX = Math.max(rectX, Math.min(ballX, rectX + rectWidth));
    let nearestRectY = Math.max(rectY, Math.min(ballY, rectY + rectHeight));
    let deltaX = ballX - nearestRectX;
    let deltaY = ballY - nearestRectY;

    // Diagnostycznie do kolizji z paletk¹.
    if (rotateOnCollision) {
        console.log("=========================================================");
        console.log("movementVector.x = " + movementVector.x);
        console.log("movementVector.y = " + movementVector.y);
        console.log("ballX = " + ballX);
        console.log("ballY = " + ballY);
        console.log("nearestRectX = " + nearestRectX);
        console.log("nearestRectY = " + nearestRectY);
        console.log("deltaX = " + deltaX);
        console.log("deltaY = " + deltaY);

        console.log("deltaX ** 2 + deltaY ** 2 < BALL_RADIUS ** 2 = " + (deltaX ** 2 + deltaY ** 2 < BALL_RADIUS ** 2));
        console.log("rectY = " + rectY);
        console.log("rectY + rectHeight = " + (rectY + rectHeight));
        console.log("rectX = " + rectX);
        console.log("rectX + rectWidth = " + (rectX + rectWidth));
    }

    if (deltaX ** 2 + deltaY ** 2 - BALL_RADIUS ** 2 < EPSILON) {
        if (nearestRectY == rectY) {
            movementVector.y = -movementVector.y;
        }
        else if (nearestRectY == rectY + rectHeight) {
            movementVector.y = -movementVector.y;
        }
        else if (nearestRectX == rectX) {
            movementVector.x = -movementVector.x;
        }
        else if (nearestRectX == rectX + rectWidth) {
            movementVector.x = -movementVector.x;
        }
        // Musimy po wykryciu krawêdzi obliczac obrót, poniewa¿ inaczej porównania w ifach bêd¹
        // nieprecyzyjne i czêsto nawet zwróc¹ false!
        if (rotateOnCollision) {
            if (rightPressed) {
                movementVector = rotateVector(movementVector, 10, true);
            } else if (leftPressed) {
                movementVector = rotateVector(movementVector, 10, false);
            }
        }
        return true;
    }

    return false;
}

function testingFunctions() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    //ctx.fillStyle = "#123456";
    //ctx.fill();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.stroke();
    ctx.closePath();
}