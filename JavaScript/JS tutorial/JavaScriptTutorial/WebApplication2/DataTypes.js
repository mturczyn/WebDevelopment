/**
 * Pokazuje działanie funkcji isNaN, isFinite oraz inne ciekawostki z zakresu pracy z liczbami w JS
 * */
function numbersDemo() {
    alert(`isNaN(Nan) = ${isNaN(NaN)}
     isFinite(NaN) = ${isFinite(NaN)}
     isFinite(1e500) = ${isFinite(1e500)}
     isFinite(Infinity) = ${isFinite(Infinity)}
     isFinite(123) = ${isFinite(123)}`);

    //alert(parseInt('100px')); // 100
    //alert(parseFloat('12.5em')); // 12.5
    //alert(parseInt('12.3')); // 12, only the integer part is returned
    //alert(parseFloat('12.3.4')); // 12.3, the second point stops the reading
    //alert(parseInt('0xff', 16)); // 255
    //alert(parseInt('ff', 16)); // 255, without 0x also works
    //alert(parseInt('2n9c', 36)); // 123456

    // Zagadka..
    alert(6.35.toFixed(1)); // binarnie 6.35 = 6.3499999... zatem po zaokrągleniu mamy 6.3
    alert((6.35*10).toFixed(0)/10);
}
/** Pokazuje niektóre operacje na typie string. Na przykład jak używać kodów unikodowych
 *  aby uzyskać pewne specjalne znaki (np. emotikony).
 */
function stringDemo() {
    //alert("\u00A9"); // ©
    //alert("\u{20331}"); // 佫, a rare Chinese hieroglyph (long unicode)
    //alert("\u{1F60D}");
    // użyteczne metody stringów:
    let str = "hello world";
    str.indexOf("world");  // 6
    str.indexOf("woorld"); // -1
    str.includes("world"); // true
    str.startsWith("hello");
    str.endsWith("rld");
    str.slice(2, 4); // ll - zezwala na ujemne argumenty (liczone od końca)
    str.substring(2, 4); //ll
    str.substr(2, 4); // "llo "- zezwala na ujemny argument dla parametru start (liczone od końca

    str = '';
    for (let i = 65; i <= 220; i++) {
        str += String.fromCodePoint(i);
    }
    alert(str);
    alert("h".codePointAt(0));
}

function arrayDemo() {
    let array = [];
    alert(array[0]);
    array[0] = "something";
    alert(`first element ${array[0]} and its type ${typeof (array[0])}`); // typ string
    array[1] = 1;
    alert(`first element ${array[1]} and its type ${typeof (array[1])}`); // typ number
    // Na podstawie powyższego widać, że tablice mogą zawierać elementy różnych typów.
    // Gdy pobieramy nieistniejący element, otrzymujemy undeifned.
    // Nowe elementy dodjemy przypisując element nowemu indeksowi.

    // Tablica autatycznie ma zaimplementowaną konwersję do stringa,
    // wypisuje wszystkie elementy po przecinku.
    alert(`tablica: ${array}, jej długość: ${array.length}`);

    array.push(function () { alert("Hello world!") });
    array.shift();

    for (let item of array) {
        if (typeof (item) == "function") item();
        else alert(item);
    }
    // Zwraca ostatni element z listy usuwając go
    let last = array.pop();

    // Operacja odwrotna do shift to unshift - dodaje element(y) na sam początek kolekcji
    array.unshift("firstElement", "second element");
    array.push({ name: "John", }, { name: "John", age: 30 });

    for (let key in array) alert(array[key]);
    // Tablice mozna również tworzyć za pomocą konstruktora przyjmującego przykładowe elementy.
    // Jednak jak przekażemy liczbę, utworzona zostanie tablica o takiej długości.
}

function arrayMethods() {
    let array = ["first", "second", "third"];
    delete array[2];
    // po usunięciu elementu wciąż pokazuje 3!!
    alert(array.length);

    array = ["first", "second", "third", "fourth"];
    // Usuwa 2 elementy zaczynając od indeksu 1
    //array.splice(1, 2);
    //alert(array); // first,fourth
    // Usuwa 2 elementy zaczynając od indeksu 1 oraz wstawia nowy element w ich miejsce
    // Jeśli drugi element (deleteCount) ustawiony był na 0, to tylko byśmy
    // "wcisnęli" nowy element na pozycji 1.
    // Splice pozwala na użycie negatywnych liczb jako indeksów.
    array.splice(1, 2, "new element");
    alert(array); // first,new element,fourth

    arr = ["t", "e", "s", "t"];
    alert(arr.slice(1, 3)); // e,s (copy from 1 to 3)
    alert(arr.slice(-2)); // s,t (copy from -2 till the end)

    ["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
        alert(`${item} is at index ${index} in ${array}`);
    });

    let users = [
        { id: 1, name: "John" },
        { id: 2, name: "Pete" },
        { id: 3, name: "Mary" }
    ];

    let user = users.find(item => item.id == 1);

    alert(user.name); // John
    // find zwraca pierwszy element spełniającypodany warunek, natomaist
    // filter zwraca tablicę wszystkich elementów spełniających warunek.

    let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
    alert(lengths); // 5,7,6

    let arr = [1, 2, 15];
    // sort przyjmuje funkcje sortującą zwracającą liczbę:
    // ujemną, jesli drugi element jest większy,
    // dodatnią, gdy drugi jest mniejszy,
    // zero, gdy są równe
    arr.sort((a, b) => a - b);
    alert(arr);  // 1, 2, 15
}
// Zastosowanie funckji reduce, funkja reduceRight robi to samo, tylko idzie od końca tablicy.
function factorial() {
    let result = [1, 2, 3, 4, 5].reduce((previous, current) => {
        alert(`prev = ${previous}, curr = ${current}`);
        return previous * current
    }, 1);
    alert(result);
}
// Wiekszość metod tablic wspiera specjalny argument thisArg, który dostarcza obiekt
// do funkcji jako kontekst (dla słowa kluczowego this).
function thisArgDemo() {
    let army = {
        minAge: 18,
        maxAge: 27,
        canJoin(user) {
            return user.age >= this.minAge && user.age < this.maxAge;
        }
    };

    let users = [
        { age: 16 },
        { age: 20 },
        { age: 23 },
        { age: 30 }
    ];

    // find users, for who army.canJoin returns true
    let soldiers = users.filter(army.canJoin, army);

    alert(soldiers.length); // 2
    alert(soldiers[0].age); // 20
    alert(soldiers[1].age); // 23
}

// ITERATORS:
let fibonacciNumbers = {
    from: [1, 2],
    to: 124
};

// 1. call to for..of initially calls this
fibonacciNumbers[Symbol.iterator] = function () {
    // ...it returns the iterator object:
    // 2. Onward, for..of works only with this iterator, asking it for next values
    return {
        current: this.from,
        last: this.to,
        // 3. next() is called on each iteration by the for..of loop
        next() {
            // 4. it should return the value as an object {done:.., value :...}
            if (this.current[0] + this.current[1] <= this.last) {
                let x = this.current[1];
                this.current[1] = this.current[0] + x;
                this.current[0] = x;
                return { done: false, value: this.current[0] + this.current[1], };
            } else {
                return { done: true, };
            }
        }
    };
};
function listFibonacciNumbers() {
    // UWAGA: funckja Array.from wykorzystuje enumerator, tzn. jak już raz za jej pomocą
    // wygenerujemy tablicę, enumerator będzie już na końcu naszego "iterable'a" i już
    // nic nie wyświetli sie w pętli.
    let arr = Array.from(fibonacciNumbers);
    // now it works!
    for (let num of fibonacciNumbers) {
        alert(num); // 1, then 2, 3, 4, 5
    }
    // To już będzie pusta tablica ze względu na wyczerpanie naszego enumeratora.
    arr = Array.from(fibonacciNumbers);
}
function getEnumerator() {
    let str = "Hello";
    // does the same as
    // for (let char of str) alert(char);
    let iterator = str[Symbol.iterator]();
    while (true) {
        let result = iterator.next();
        if (result.done) break;
        alert(result.value); // outputs characters one by one
    }
}

function mapDemo() {
    let recipeMap = new Map([
        ['cucumber', 500],
        ['tomatoes', 350],
        ['onion', 50]
    ]);
    // iterate over keys (vegetables)
    for (let vegetable of recipeMap.keys()) {
        alert(vegetable); // cucumber, tomatoes, onion
    }
    // iterate over values (amounts)
    for (let amount of recipeMap.values()) {
        alert(amount); // 500, 350, 50
    }
    // iterate over [key, value] entries
    for (let entry of recipeMap) { // the same as of recipeMap.entries()
        alert(entry); // cucumber,500 (and so on)
    }

    // array of [key, value] pairs
    let simpleMap = new Map([
        ['1', 'str1'],
        [1, 'num1'],
        [true, 'bool1']
    ]);
    alert(simpleMap.get('1')); // str1

    let obj = {
        name: "John",
        age: 30
    };
    let mapFromObject = new Map(Object.entries(obj));
    alert(mapFromObject.get('name')); // John
    // Odwortna metoda Object.fromEntires: mając kolekcję par [key, value] możemy uzyć
    // obiektu Map do inicjalizacji obiektu:
    let reverseObject = Object.fromEntires(mapFromObject.entries());
    // krócej: let reverseObject = Object.fromEntires(mapFromObject);
}
/**
 * Usuwa wszystkie anagramy i zostawia tylko pierwsze.
 * */
function cleanArrayFromAnagrams() {
    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
    let map = new Map(arr.map(i => [i.toLowerCase().split('').sort().join(''), i]));
    let arrayWithoutAnagrams = Array.from(map.values());
    return arrayWithoutAnagrams;
}

// Object.keys , Object.values, etc.
function staticObjectMethods() {
    let married = Symbol("married");
    let user = {
        name: "Marian",
        age: "90",
        gender: "male",
        [married]: "yes",
    };
    // Poniższe metody pomijają symbole.
    alert(Object.values(user));
    alert(Object.keys(user));
    // Wylistuje tylko symbole (będzie błąd, bo nie potrafi przekonwertować symbolu do stringa):
    //alert(Object.getOwnPropertySymbols(user));
    // Wylistuje tylko wszystko:
    //alert(Object.Reflect.ownKeys(user));
}

function deconstruction() {
    let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    alert(`name1 = ${name1} name2 = ${name2} rest = ${rest}`);
    // default values
    let [name = "Guest", surname = "Anonymous"] = ["Julius"];
    // albo
    // let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];
    alert(name);    // Julius (from array)
    alert(surname); // Anonymous (default used)

    // Dekonstrukcja obiektu
    let options = { option1: 'true', option2: false, };
    // musimy użyć takich samych nazw
    let { option1, option2 } = options;
    // lub
    let { option1: op1, option2: op2 } = options;
    alert(op1 + ' ' + op2); // true false
}