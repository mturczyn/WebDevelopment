window.onload = () => {
    forcingHidingFields();
}

function proxyDemo() {
    let target = {};
    let proxy = new Proxy(target, {});
    proxy.testValue = 5;
    // Przekazana  zostanie wartość do obiektu target.
    alert(target.testValue);
    // Możemy ją również odczytać.
    alert(proxy.testValue);
}
function interceptingProxy() {
    let target = {
        name: "John",
    };
    let proxy = new Proxy(target, {
        get: function (target, prop) {
            if (prop in target)
                return target[prop];
            else
                return "no such property";
        },
        set(target, prop, value) {
            if (typeof value == 'number') {
                target[prop] = value;
                return true;
            } else {
                return false;
            }
        }
    });
    //alert(proxy.name);
    //alert(proxy.age);
    proxy.age = 18; // pomyślnie dodany
    alert(proxy.age);
    proxy.age = "123";
}
function forcingHidingFields() {
    let user = {
        name: "John",
        _password: "***",
    };
    user = new Proxy(user, {
        get(target, prop) {
            if (prop.startsWith('_')) {
                throw new Error('Access denied');
            } else {
                let value = target[prop];
                return (typeof value == 'function') ?
                    value.bind(target) : value;
            }
        },
        set(target, prop, value) {
            if (prop.startsWith('_')) {
                throw new Error('Access denied');
            } else {
                target[prop] = value;
                return true;
            }
        },
        deleteProperty(target, prop) {
            if (prop.startsWith('_')) {
                throw new Error('Access denied');
            } else {
                delete target[prop];
                return true;
            }
        },
        ownKeys(target) {
            return Object.keys(target).filter(key => !key.startsWith('-_'));
        }
    });

    // "get" doesn't allow to read _password
    try {
        alert(user._password); // Error: Access denied
    } catch (e) { alert(e.message); }

    // "set" doesn't allow to write _password
    try {
        user._password = "test"; // Error: Access denied
    } catch (e) { alert(e.message); }

    // "deleteProperty" doesn't allow to delete _password
    try {
        delete user._password; // Error: Access denied
    } catch (e) { alert(e.message); }

    // "ownKeys" filters out _password
    for (let key in user) alert(key); // name
}