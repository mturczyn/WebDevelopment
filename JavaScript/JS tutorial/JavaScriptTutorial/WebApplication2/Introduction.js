function add(num1, num2) {
    return num1 + num2;
}

function errorFunc() {
    return 100 / 0;
}

function lineBreakTest() {
    return  100;
}

//function anotherLineBreakTest{
//    return 
//    1000;
//}

function declaringVariables() {
    // To jest dopuszczalne w starych skryptach, czli przypisanie do zmiennej bez nincjalizowania jej.
    //message = 'Hi!';
    // Jednak lepiej inicjalizować zmienne.
    let message = "Hi!";
    //var message = "Hi!";
    let bigNumber = Infinity;
    let extendedMessage = `${message} Michal`;
    alert(extendedMessage);
}

function variableTypes() {
    let x = 1;
    alert(typeof x);
    x = "Hi";
    alert(typeof x);
}

function toStringTest() {
    let x = 123;
    // Równoważne
    let str = x.toString();
    let anotherStr = String(x);
}
 /* Znak równości/przypisania (=) zwraca przypisawaną wartość */
function assignmentDemo() {
    let a = 1;
    let b = 2;

    let c = 3 - (a = b + 1);

    alert(a); // 3
    alert(c); // 0
}
// Operator ++ zwraca wartość, zależną od tego, czy jest przed czy po zmiennej (-- działa analogicznie).
function increment() {
    let counter = 1;
    let a = ++counter;
    alert(a); // 2
    //In the line(*), the prefix form++counter increments counter and returns the new value, 2. So, the alert shows 2.
    //Now, let’s use the postfix form:
    counter = 1;
    a = counter++; // (*) changed ++counter to counter++
    alert(a); // 1
}

function bitwiseInPlace() {
    let x = 1;
    x <<= 2; //4
    alert(x);
}

function stringComparison() {
    alert('a' < 'z'); // true
    alert('z' < 'aa'); // false

    // When values of different types are compared, they get converted to numbers 
    // (with the exclusion of a strict equality check).
    alert("1" == 1); // true
    alert("1" === 1); // false
}

function promptAndConfirmDemo() {
    let result = prompt("Press something...", 100);
    alert(result);

    let isBoss = confirm("Are you the boss?");
    alert(isBoss); // true if OK is pressed
}

function conditional() {
    let userNumber = prompt("Bigger than 3:", 3);
    let cond = userNumber > 3;
    if (cond) {
        alert(`${typeof cond}, toString: ${cond.toString()}`);
    } else {
        alert(`${typeof cond}, toString: ${cond.toString()}`);
    }
}

function ternaryOperatoryQuestionMark() {
    let company = prompt('Which company created JavaScript?', '');

    (company == 'Netscape') ?
        alert('Right!') : alert('Wrong.');
}

function officialJsName() {
    let answer = prompt("What is the \"official\" name of JavaScript?", "");
    if (answer == "ECMAScript") {
        alert("Right!");
    } else {
        alert("Didn’t know ? ECMAScript!");
    }
}

function logicalOperatorsDontReturnBoolean() {
    let currentUser = null;
    let defaultUser = "John";
    let name = currentUser || defaultUser || "unnamed";
    alert(name); // selects "John" – the first truthy value

    let zero = 0;
    let one = 1;
    let two = 2;
    alert(`or operator ${zero || one || two} , and operator ${zero && one && two}`); // 1 0
    alert(`or operator ${two || one || zero} , and operator ${two && one && zero}`); // 2 0
}

function escCancellingPrompt() {
    let result = prompt("Press ESC to cancel");
    altert(result.toString());
}

function forLoop() {
    // Etykieta (Label) umożliwia "złapanie" zewnętrznego kontekstu i wyjście do niego z pętli za pomocą break;
    outer: for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let input = prompt(`Value at coords (${i},${j})`, '');
            // if an empty string or canceled, then break out of both loops
            if (!input) break outer; // (*)

            // do something with the value...
        }
    }
    alert('Done!');
}
// global variables
let x = 0;
let str = "hello";

function globalVariables() {
    alert(x);
    alert(str);
}

let sayHi = function (name) {
    alert("Hello " + name);
}

function callFunctionDefinedInVariable(name) {
    sayHi(name);
    let zero = abc();
    alert(zero);
    function abc() {
        return 0;
    }
    let anotherFunction = globalVariables;
    anotherFunction();
}

function breakpointFunction() {
    let x = 0;
    debugger;
}
/**
 * Shows the string.
 *
 * @param {bool} show Whether to show a string.
 */
function conditionalAlert(show) {
    if (show)
        alert("Alert!");
}