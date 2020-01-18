"use strict"
function objectDemo() {
    //debugger;
    // Obiekty można tworzyć na dwa różne sposoby:
    let obj1 = new Object();
    let obj2 = {};

    let user = {
        age: 30,
        name: "John"
    };

    alert(`Hello, my name is ${user.name} and I am ${user.age} years old`);

    // Można łatwo dodawać nowe właściwości oraz usuwać stare
    user.isAdmin = true;
    delete user.age;
    if (user.isAdmin) {
        alert(`Po usunięciu wieku: imię: ${user.name} wiek: ${user.age}`);
    }
    // Ogólnie obiekty działają jak słowniki, których kluczem jest nazwa właściwości.
    // Stąd też ich nazwy mogą zawierać spacje.
    let multiWordProps = {
        "multi word property": 0,
    }
    alert(multiWordProps["multi word property"]);
    delete multiWordProps["multi word property"];
    multiWordProps["another property"] = 1000;
    let key = "another property";
    alert(multiWordProps[key]);

    // Computed properties:
    let computedPropObj = {
        ["prop"]: 1024,
    }
    alert(computedPropObj.prop);
}
// Skrótwy zapis definicji obiektu
function makeUser(name, age) {
    return {
        name, // takie samo jak name: name
        age,
    }
}

function inOperator() {
    let user = {
        age: 30,
    }
    if ("age" in user)
        alert("Has age!");
    if (! ("name" in user))
        alert("Does not have name!");
    user.name = "Johnny";

    for (let key in user)
        alert(user[key]);
}

function copyingObjects() {
    let user = {
        age: 30,
        name: "John",
    }
    let clone = {};
    for (let prop in user) {
        clone[prop] = user[prop];
    }
    // Nie wpływa na user
    clone.age = 25;
    alert(user.age); // 30

    let permission1 = {
        edit: true,
    };
    let permission2 = {
        delete: true,
    };
    let permissions = {};
    Object.assign(permissions, permission1, permission2);
    alert(`Utworzono nowy obiekt z innych obiektów: ${permissions.edit} ${permissions.delete}`);

    let clonedUser = Object.assign({}, { name: "Pete", age: 30 });
    alert(clonedUser.name);
}

// Symbole pozwalają na unikatowe odwołania do właściwości obiektów, ponieważ
// tworzone w prosty sposób, poprzez proste podanie nazwy, taka właściwość w łatwy
// sposób może wpłyynąć na działanie innych bibliotek, gdy one będą próbowały dodać
// właściwość o tej samej nazwie. Symbole są rozróżnialne i stanowią bezpieczną alternatywę
// dla stringów, jako nazw właściwości. Można o nich myśleć jako o unikatowych identyfikatorach
// właściowści.
// I vice versa: jakiś zewnetrzny kod również nam nie zmodyfikuje takiej właściwości.
// Symboliczne właściwości nie są dostępne poprzez loopowanie po właściwościach obiektu.
// Jednak zostają przekopiowana gdy korzysta się z Object.assign.
function symbolsDemo() {
    let sym = Symbol("mySymbol");
    let user = {
        [sym]: 30,
    };
    let anotherSymbol = Symbol.for("mySymbol");
    //alert(user[anotherSymbol]);//undefined
    alert(user[sym]);//30
    let yetAnotherSymbol = Symbol("mySymbol");
    alert(user[yetAnotherSymbol]);//undefined
}

let selfIntroduction = function () {
    alert(`My name is ${this.name}`);
}
function methodsDemo() {
    // these objects do the same
    let user = {
        sayHi: function () {
            alert("Hello");
        }
    };

    // method shorthand looks better, right?
    user = {
        sayHi() { // same as "sayHi: function()"
            alert("Hello");
        },
        name: "John",
    };

    user["sayHi"]();

    user = { name: "Johnny" };
    user.intro = selfIntroduction;
    user.intro();
    delete user.name;
    user.intro();
}

function thisWithoutObjects() {
    // Throws exception "Cannot read property of undefined."
    alert("My name is: " + this.name);
}

function bindingObjToMethod() {
    let user = { name: "John", };
    let boundFunc = thisWithoutObjects.bind(user);
    boundFunc();
}
// Ciekawy problem
function interestingProblem() {
    let makeUser = function () {
        return {
            name: "John",
            ref: this
        }
    }
    let user = makeUser();
    //alert(user.ref.name); // Error: Cannot read property of undefined.
    user.makeAnother = makeUser;
    alert(user.makeAnother().name); // John
}

function toPrimitiveConversion() {
    let user = {
        name: "John",
        money: 1000,

        [Symbol.toPrimitive](hint) {
            alert(`hint: ${hint}`);
            return hint == "string" ? `{name: "${this.name}"}` : this.money;
        },
        /* Nowy standrard JS (ES6) szuka wpierw metody o symbolu Symbol.toPrimitive,
         * jeśli takowego nie znajdzie, jest tzw. fallback, czyli szuka odpowiednich
         * metod dla wskazanych konwersji, które mają ustalone nazwy, jak poniżej.
         * Jest to stare działanie silnika.
         */
        // for hint="string"
        toString() {
            return `{name: "${this.name}"}`;
        },

        // for hint="number" or "default"
        valueOf() {
            return this.money;
        }
    };

    // conversions demo:
    alert(user); // hint: string -> {name: "John"}
    alert(+user); // hint: number -> 1000
    alert(user + 500); // hint: default -> 1500
}