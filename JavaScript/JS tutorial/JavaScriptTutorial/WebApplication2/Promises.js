function promisesDemo(fail) {
    let promise = new Promise(
        (resolve, reject) => {
            if (fail) {
                resolve('this is the resut of a promise');
            } else {
                reject(new Error('Something bad happened!'));
            }
        }
    );

    promise.then(
        result => alert(`then method: ${result}`),
        error => alert(`There was an error: ${error}`)
    );
}

function loadScript(src) {
    return new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));

        document.head.append(script);
        document.reload
    });
}