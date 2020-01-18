class Animal {
    constructor(name, speed) {
        this.name = name;
        this.speed = speed;
    }

    run(speed) {
        this.speed += speed;
    }

    sayHi() {
        alert("Hi, I'm " + this.name + " and I can move at speed of " + this.speed);
    }
}

class Rabbit extends Animal {
    constructor(name) {
        super(name, 10);
        //this.name = name;
        //this.speed = speed;
    }
    // Class may have only one constructor
    //constructor(name) {
    //    this.name = name;
    //    this.speed = 0;
    //}
}

function ContructorsTest() {
    let rab = new Rabbit();
    rab.sayHi();
    rab = new Rabbit("Rabito", 5);
    rab.sayHi();
    rab = new Rabbit("El Rabito");
    rab.sayHi();
}

function superTests() {
    let animal = {
        name: "Animal",
        eat() {
            alert(`${this.name} eats.`);
        }
    };
    let rabbit = {
        __proto__: animal,
        name: "Rabbit",
        eat() {
            // that's how super.eat() could presumably work
            this.__proto__.eat.call(this); // (*)
        }
    };
    rabbit.eat(); // Rabbit eats.
}

function anotherSuperTest() {
    let animal = {
        eat: function () { // intentially writing like this instead of eat() {...
            // ...
        }
    };
    let rabbit = {
        __proto__: animal,
        eat: function () {
            super.eat();
        }
    };
    rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
}

