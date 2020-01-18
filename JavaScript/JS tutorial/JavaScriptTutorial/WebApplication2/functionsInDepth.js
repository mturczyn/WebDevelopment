let recursionDepth = 0
function fibonacci(n) {
    if (n < 0) throw new Error("n nie może być ujemne");
    recursionDepth++;
    //alert("Rekursja: " + recursionDepth);
    if (n < 2) {
        recursionDepth--;
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function linkedListDemo(){
    let list = { value: 1 };
    list.next = { value: 2 };
    list.next.next = { value: 3 };
    list.next.next.next = { value: 4 };
}

function restAndSpread() {
    let sum = function (...args) {
        return args.reduce((a, b) => a + b, 0);
    }
    alert(sum(1, 2, 3));
    alert(sum(1, 2, 3, 4, 5));

    let showName = function() {
        alert(arguments.length);
        alert(arguments[0]);
        alert(arguments[1]);

        // it's iterable
        // for(let arg of arguments) alert(arg);
    };
    // shows: 2, Julius, Caesar
    showName("Julius", "Caesar");
    // shows: 1, Ilya, undefined (no second argument)
    showName("Ilya");

    // Ten sam operator może zostać użyty, aby do funkcji o nieustalonej liczbie
    // argumentów przekazać argumenty, "rozwijając" je z listy:
    let arr = [3, 5, 1, 100, 123, -11];
    alert('Max jest = ' + Math.max(...arr)); // 5 (spread turns array into a list of arguments)
    // Możemy nawet rozwinąć takkilka list:
    let arr1 = [1, -2, 3, 4];
    let arr2 = [8, 3, -8, 1];
    alert(Math.max(...arr1, ...arr2)); // 8
    // Też używany do konkatenacji tablic.
    let merged = [0, ...arr, 2, ...arr2];
    alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
}

function scopes() {
    function makeCounter() {
        let count = 0;
        return function () {
            return count++;
        };
        alert([[Environment]].asd);
    }
    let asd = "asd";
    makeCounter()();
}

function varVsLet() {
    let phrase = "Hello";

    if (true) {
        let user = "John";
        let sayHi = function() {
            alert(`${phrase}, ${user}`);
        }
    }
    // Jesli użyjemy var, to wywoła sie funkcja, jeśli użyjemy let, to nie będzie
    // błędu, ponieważ var nie respektuje bloków kodu i zasięgu :)
    sayHi();
}

function functionAsObjects() {
    let arrOfFunctions = [function () { }];
    //alert(arrOfFunctions[0].name == ""); // true
    // Właściwości na funkcjach
    function sayHi() {
        alert("Hi");

        // let's count how many times we run
        sayHi.counter++;
        // nie działa this w funkcjach
        //this.counter++;
    }
    sayHi.counter = 0; // initial value
    sayHi(); // Hi
    sayHi(); // Hi
    alert(`Called ${sayHi.counter} times`); // Called 2 times

    // Named Function Expression, NFE
    sayHi = function func(who) {
        if (who) {
            alert(`Hello, ${who}`);
        } else {
            // w tym miejscu możemy użyc też sayHi("Guest"), jednak gdy w zewnętrznym scopie
            // przypiszemy jej inną wartość, w środku tej funkcji będzie próbowało
            // odnaleźć w zewnętrznym kontekście zmienną sayHi i ją wywołać
            // (a może być nullem bądź jakąś wartością), stąd fajnie jest niekiedy nazwać funkcję
            // podczas przypiasania.
            func("Guest"); // use func to re-call itself
        }
    };
    sayHi(); // Hello, Guest
    // But this won't work:
    // func(); // Error, func is not defined (not visible outside of the function)
}

function functionTask() {
    function sum(a) {
        let currentSum = a;
        function f(b) {
            currentSum += b;
            return f;
        }
        f[Symbol.toPrimitive] = function (hint) {
            //alert(hint);
            return currentSum;
        };
        return f;
    }

    alert(sum(1)(2)); // 3
    alert(sum(5)(-1)(2)); // 6
    alert(sum(6)(-1)(-2)(-3)); // 0
    alert(sum(0)(1)(2)(3)(4)(5)); // 15
}
// Funkcje można tworzyc również za pomocą konstruktora
function newFunctionSyntax() {
    let sum = new Function('a', 'b', 'return a + b');
    alert(sum(1, 2)); // 3
    // And here there’s a function without arguments, with only the function body:
    let sayHi = new Function('alert("Hello")');
    sayHi(); // Hello
}

function functionsDelayAndTimeouts(milliseconds) {
    alert("Hello in delayed world");
    // Po sekundzie dostaniemy komunikatem po oczach
    setTimeout((str) => alert(str), milliseconds, "Hello world");

    let funcToCancel = setTimeout(() => alert("To się nie wywoła!"), milliseconds);
    // Anulujemy wykonanie funkcji
    clearTimeout(funcToCancel);

    alert("Koniec funkcji");
}

function timerLikeIntervals() {
    // startujemy wykonywanie funkcji co dwie sekundy
    let periodicMsg = setInterval(() => alert("Okresowy komunikat"), 2000);
    // Po 5 sekundach zatrzymujemy wykonywanie
    setTimeout(() => clearInterval(periodicMsg), 5000);
}

function decorators() {
    let worker = {
        someMethod() {
            return 1;
        },

        slow(x) {
            alert("Called with " + x);
            return x * this.someMethod(); // (*)
        }
    };

    function cachingDecorator(func) {
        let cache = new Map();
        return function (x) {
            if (cache.has(x)) {
                return cache.get(x);
            }
            // Jakbyśmy dali tylko func(x), to dostalibysmy wkońcu błąd,
            // bo przypisując metodę obiektu byłby problem z kontekstem (this).
            // Wytłumaczenie z tutoriala:
            // So when worker.slow(2) is executed, the wrapper gets 2 as an argument
            // and this = worker(it’s the object before dot).
            // A więc przekazujemy obiekt, z którym dana metoda została przekazana.
            let result = func.call(this, x); // "this" is passed correctly now
            cache.set(x, result);
            return result;
        };
    }

    worker.slow = cachingDecorator(worker.slow); // now make it caching
    // jak byśmy uzyli cachowania dla tej samej funkcji ponowownie, oczywiście nowy Map
    // zostałby stworzony i taka funkcja miałaby własne cachowanie
    // worker.slow2 = cachingDecorator(worker.slow);
    alert(worker.slow(2)); // works
    alert(worker.slow(2)); // works, doesn't call the original (cached)
}

function functionBindingDemo() {
    let f = function () {
        alert(this.userName);
    }

    let user = {
        userName: "John",
    };
    // "Przypinamy" kontekst
    let boundFunc = f.bind(user);
 
    //f.call(user); // wyświetli John
    //boundFunc(); // wyświetli John

    f = function (word1, word2) {
        alert(word1 + " " + word2);
    }
    // można też "przypiąć" argumenty
    boundFunc = f.bind(null, "hello", "world!");
    boundFunc();
    boundFunc = f.bind(null, "hello"); // hello world
    boundFunc("your name here"); // hello your name here
}

function testtt() {
    let group = {
        title: "Our Group",
        students: ["John", "Pete", "Alice"],

        showList() {
            this.students.forEach(function (student) {
                // Error: Cannot read property 'title' of undefined
                alert(this.title + ': ' + student)
            }, this);
        }
    };

    group.showList();
}