// metoda main :D
window.onload = () => {
    testAsync();
    //compareAsyncResult();
}


async function returnOneAsync() {
    return 1;
}

async function returnOneAsyncPromise() {
    return new Promise((resolve) => resolve(1));
}

function compareAsyncResult() {
    let p1 = returnOneAsync();
    let p2 = returnOneAsyncPromise();
    // Obie metody zwracają obiekt Promise.
    p1.then(alert);
    p2.then(alert);
}

// async działają z thenable (implementujące metodę then)
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        //alert(resolve);
        // resolve with this.num*2 after 1000ms
        setTimeout(() => { alert("This will appear second after first alert"); resolve(this.num * 2) }, 6000); // (*)
    }
};

async function testAsync() {
    // waits for 1 second, then result becomes 2
    let result = new Thenable(1);
    setTimeout(() => alert("First alert"), 5000);
    alert(await result);
}