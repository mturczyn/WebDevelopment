function User(name) {
    // this = {};  (implicitly)

    // add properties to this
    this.name = name;
    this.isAdmin = false;
    // return this;  (implicitly)
}

function constructorDemo() {
    // Każda funkcja może zostać wywołana ze słowem kluczowym new,
    // jednak konwencja, że konstruktory nazywa się nazwami z wielkiej litery
    // jasno określa, że taka metoda powinna byc wywołana z new.
    let user = new User("Michał");
    alert(user.name)
    // user tutaj będzie undefined, jednak można się przed tym zabezpieczyć,
    // stosując falgę target.new w konstruktorze (ogólnie w metodzie), aby
    // sprawdzić czy została wywołana ze słowem kluczowym new (true = użyte new).
    user = User("Michał");
    alert(user);

    // Innym sposobem wywołania konstruktora jest poniższe wywołanie,
    // jednak nie jest zalecane.
    let anotherUser = new function () {
        this.name = "John";
        this.isAdmin = false;

        // ...other code for user creation
        // maybe complex logic and statements
        // local variables etc
    };
}

function UserEq(name) {
    this.name = name;
    this[Symbol.toPrimitive] = function (hint) {
        alert("hint is: " + hint);
        return 0;
    };
}
function objectEqualityCheck() {
    let user1 = new UserEq("John");
    let user2 = new UserEq("Rambo");
    // It checks the equality of references (space in memory),
    // so it doesn't work, although conversion is correct and works
    // when called user1 == 0 (true).
    if (user1 == user2) alert("Equal!");
}