// Prototypal inheritance
function prototypesDemo() {
    let animal = {
        eats: true
    };
    let rabbit = {
        jumps: true
    };

    rabbit.__proto__ = animal; // (*)

    // we can find both properties in rabbit now:
    alert(rabbit.eats); // true (**)
    alert(rabbit.jumps); // true
}

function accessorProperties() {
    // animal has methods
    let animal = {
        walk() {
            if (!this.isSleeping) {
                alert(`I walk`);
            }
        },
        sleep() {
            this.isSleeping = true;
        }
    };
    let rabbit = {
        name: "White Rabbit",
        __proto__: animal
    };
    // modifies rabbit.isSleeping
    rabbit.sleep();
    alert(rabbit.isSleeping); // true
    alert(animal.isSleeping); // undefined (no such property in the prototype)
}

function tasksFirstLesson() {
    //let animal = {
    //    jumps: null
    //};
    //let rabbit = {
    //    __proto__: animal,
    //    jumps: true
    //};
    //alert(rabbit.jumps); // ? (1)
    //delete rabbit.jumps;
    //alert(rabbit.jumps); // ? (2)
    //delete animal.jumps;
    //alert(rabbit.jumps); // ? (3)

    let hamster = {
        stomach: [],

        eat(food) {
            this.stomach = [food];
        }
    };

    let speedy = {
        __proto__: hamster
    };

    let lazy = {
        __proto__: hamster
    };
    // This one found the food
    speedy.eat("apple");
    alert(speedy.stomach); // apple
    // This one also has it, why? fix please.
    alert(lazy.stomach); // apple
}

function prototypeSettingInConstructor() {
    function Rabbit() {
        // this = {};  (implicitly)

        // add properties to this
        this.jumps = true;
        // return this;  (implicitly)
    };

    let rabbit = new Rabbit();
    //alert(rabbit.constructor == Rabbit); // true

    function Rabbit() {
        // this = {};  (implicitly)

        // add properties to this
        this.jumps = true;
        // return this;  (implicitly)
    };
    // Do konstruktora przekazujemy klasę bazową poprzez właściwość prototype
    Rabbit.prototype = { eatsCarrots: true, };

    rabbit = new Rabbit();
    alert(rabbit.constructor == Rabbit); // false
    alert(rabbit.eatsCarrots); // true
}

function emptyObjectInheritedMembers() {
    let obj = {};
    alert(obj.__proto__ === Object.prototype); // true
}

function settingPrototype() {
    let animal = {
        eats: true
    };
    // create a new object with animal as a prototype
    let rabbit = Object.create(animal);
    alert(rabbit.eats); // true
    alert(Object.getPrototypeOf(rabbit) === animal); // true
    Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}
}