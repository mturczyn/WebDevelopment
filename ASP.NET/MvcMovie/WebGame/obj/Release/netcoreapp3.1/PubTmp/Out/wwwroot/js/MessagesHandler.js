'use strict';

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", (message) => {
    let listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(message));
    let chat = document.getElementById("chat");
    chat.appendChild(listItem);
});

connection.start().then(() => {
    console.log("SignalR: Start komunikacji...");
}).catch((err) => {
    return console.error(err.toString());
});

function sendMessage() {
    let message = document.getElementById('message').value;
    let chatRoom = document.getElementById('sendTo').value;
    connection.invoke("SendMessage", message, chatRoom).catch((err) => {
        return console.error(err.toString());
    });
    event.preventDefault();
}

function setChatRoom() {
    let chatRoom = document.getElementById('sendTo').value;
    connection.invoke("SetRecipent", chatRoom).then(() => {
        document.getElementById('message').disabled = false;
        document.getElementById('btnSend').disabled = false;
    }).catch((err) => {
        document.getElementById('message').disabled = true;
        document.getElementById('btnSend').disabled = true;
        return console.error(err.toString());
    });
}
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