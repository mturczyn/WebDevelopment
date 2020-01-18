function jsonConversions() {
    let user = {
        sayHi() { // ignored
            alert("Hello");
        },
        [Symbol("id")]: 123, // ignored
        something: undefined, // ignored
        someArray: [1, 2, 3],
        someString: "Daddy cool",
    };
    alert(JSON.stringify(user)); // {"someArray":[1,2,3],"someString":"Daddy cool"}

    let room = {
        number: 23
    };
    let meetup = {
        title: "Conference",
        participants: [{ name: "John", age: 30 }, { name: "Alice", age: 30 }],
        place: room // meetup references room
    };
    room.occupiedBy = meetup; // room references meetup
    // Mamy tutaj kołową (circular) zależność (room->meetup i na odwrót), co prowadzi do błędu
    // przy parsowaniu do JSONa, jednak tutaj używamy listy właściwości, które chcemy zapisać do JSONa,
    // więc w ten sposób omijamy to ograniczenie i zapis się powodzi.
    alert(JSON.stringify(meetup, ['title', 'participants', 'name'])); // {"title":"Conference","participants":[{"name":"John"},{"name":"Alice"}]}
    // Tutaj używamy funkcji, która zwraca, co dla danego klucza mamy zwrócić.
    // Gdy chcemy jakąś właściwość ominąć, to zwracamy w tej funkcji undefined.
    alert(JSON.stringify(meetup, (key, value) => key == 'occupiedBy' ? undefined : value));
    // Zwraca: {"title":"Conference","participants":[{"name":"John","age":30},{"name":"Alice","age":30}],"place":{"number":23}}

    room = {
        number: 23,
    };
    alert(JSON.stringify(room));// {"number":23}
    room = {
        number: 23,
        toJSON() {
            return this.number;
        }
    };
    alert(JSON.stringify(room));// 23
}

function deserializationFromJson() {
    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

    let meetup = JSON.parse(str, function (key, value) {
        if (key == 'date') return new Date(value);
        return value;
    });
    // Gdybyśmy uzyli tylko
    // JSON.parse(str);
    // poniższa metoda by nie działała bo data by była stringiem.
    alert(meetup.date.getDate()); // now works!
}

// Write replacer function to stringify everything, but remove properties that reference meetup:
function task() {
    let room = {
        number: 23
    };
    let meetup = {
        title: "Conference",
        occupiedBy: [{ name: "John" }, { name: "Alice" }],
        place: room
    };
    // circular references
    room.occupiedBy = meetup;
    meetup.self = meetup;

    alert(JSON.stringify(meetup, function replacer(key, value) {
        // Here we also need to test key=="" to exclude the first call where it is normal that value is meetup.
        return (key != "" && value == meetup) ? undefined : value;
    }));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
}