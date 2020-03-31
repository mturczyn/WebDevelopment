connection.on("ReceiveMessage", (message) => {
    let listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(message));
    let chat = document.getElementById("chat");
    chat.appendChild(listItem);
});

function sendMessage(recipent) {
    let message = document.getElementById('message').value;
    connection.invoke("SendMessage", message, recipent).catch((err) => {
        return console.error(err.toString());
    });
    event.preventDefault();
}
// Już mamy automatyczny wybór odbiorcy.
//function setRecipent() {
//    document.getElementById('message').disabled = false;
//    document.getElementById('btnSend').disabled = false;
//}
/*
// Pierwsza próba komunikacji: wysyłanie do serwera wiadomości + logika po stronie serwera.
// Problemem było odbieranie wiadomości od innych uzytkowników.
// Rozwiązaniem jest biblioteka SignalR.
function sendMessage() {
    let message = document.getElementById('message').value;
    $.ajax({
        type: "post",
        dataType: "json",
        data: { message: message },
        url: "/Message/HandleMessage",
        success: function (sendingData) {
            let listItem = document.createElement('li');
            listItem.appendChild(document.createTextNode(`${sendingData.messageProcessedAt} - ${sendingData.messageCount}: ${message}`));
            let chat = document.getElementById("chat");
            chat.appendChild(listItem);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
*/