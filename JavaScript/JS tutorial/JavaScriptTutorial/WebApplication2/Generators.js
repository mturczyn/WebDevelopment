window.onload = () => {
    asyncGenerators();
}

function* yieldFunction() {
    yield 1;
    yield 2;
    return 3;
}

function* yieldFunctionWithLastElement() {
    yield 1;
    yield 2;
    yield 3;
}

function yieldDemo() {
    let generator = yieldFunction();
    // Generatory są iterable.
    for (let value of generator)
        alert(JSON.stringify(value));
    generator = yieldFunction();
    let one = generator.next();
    let two = generator.next();
    let three = generator.next();
    alert(JSON.stringify(one)); // {value: 1, done: false}
    alert(JSON.stringify(two));
    alert(JSON.stringify(three));
}

function yieldDemo2() {
    for (let val of yieldFunction())
        alert(val);
    for (let val of yieldFunctionWithLastElement())
        alert(val);
    alert([...yieldFunction()]);
}

function nestedYield() {
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
    }
    function* generateAlphaNum() {
        yield* generateSequence(48, 57);
        // for (let i = 48; i <= 57; i++) yield i;
        yield* generateSequence(65, 90);
        // for (let i = 65; i <= 90; i++) yield i;
        yield* generateSequence(97, 122);
        // for (let i = 97; i <= 122; i++) yield i;
    }
    let str = '';
    for (let code of generateAlphaNum()) {
        str += String.fromCharCode(code);
    }
    alert(str); // 0..9A..Za..z
}

function passingArgWithYield() {
    function* gen() {
        // Pass a question to the outer code and wait for an answer
        let result = yield "2 + 2 = ?"; // (*)
        alert(result);
    }
    let generator = gen();
    let question = generator.next().value; // <-- yield returns the value (question 2 + 2 = ?)
    let answer = prompt(question);
    generator.next(answer); // --> pass the result into the generator

    // Another example
    function* gen() {
        let ask1 = yield "2 + 2 = ?";
        alert(ask1); // 4
        let ask2 = yield "3 * 3 = ?"
        alert(ask2); // 9
    }
    generator = gen();
    alert(generator.next().value); // "2 + 2 = ?"
    alert(generator.next(4).value); // "3 * 3 = ?"
    alert(generator.next(9).done); // true
}

function pseudoRandomNumbers(seed) {
    function* randomGenerator(seed) {
        let previous = seed;

        while (true) {
            previous = previous * 16807 % 2147483647;
            yield previous;
        }
    }

    let gen = randomGenerator(seed);
    alert(gen.next().value);
    alert(gen.next().value);
    alert(gen.next().value);
}

function asyncGenerators() {
    let range = {
        from: 1,
        to: 3,
        async *[Symbol.asyncIterator]() { // same as [Symbol.asyncIterator]: async function*()
            for (let value = this.from; value <= this.to; value++) {
                // make a pause between values, wait for something
                let promise = new Promise(resolve => setTimeout(() => {
                    alert("hello from setTimeout!");
                    resolve();
                }, 1000));
                alert("hello before await");
                await promise;
                alert("hello after await");
                yield value;
            }
        }
    };
    // Demonstrate async generator, consecutive numbers will appear one second after previous.
    // This is IIF - immediately invoked function
    (async () => {
        for await (let value of range) {
            alert(value); // 1, then 2, then 3, then 4, then 5
        }
    })();
}