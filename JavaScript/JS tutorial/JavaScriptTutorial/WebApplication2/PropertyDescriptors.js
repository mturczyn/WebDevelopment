function DescriptorsDemo() {
    let user = {
        name: "John",
        age: 32,
    };

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    alert(JSON.stringify(descriptor, null, 2));
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
    Object.defineProperty(user, 'name', {
        'writable': false,
        'enumerable': false,
    });
    // nie wyświetli właściwości name
    for (let prop in user)
        alert(prop);
    // Definiowanie nowej właściwości
    Object.defineProperty(user, "secondName", {
        value: "John",
        // for new properties need to explicitly list what's true
        enumerable: true,
        configurable: true
    });
}

function getterAndSetter() {
    let user = {
        name: "John",
        age: 32,
        get doubleAge() {
            return this.age * 2;
        },
        set doubleAge(value) {
            this.age = value / 2;
        }
    }

    user.doubleAge = 32;
    alert(`doubleAge ${user.doubleAge}, regular age: ${user.age}`);
}