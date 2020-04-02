'use strict';

connection.on("ReceiveMessage", (message, messageId, sentBy) => {
    let chat = document.getElementById("chat");
    chat.appendChild(createMessageElement(message, false));
    chat.scrollTop = chat.scrollHeight;
    connection.invoke("ConfirmMessage", messageId).catch((err) => {
        return console.error(err.toString());
    });
});

connection.on("ConfirmMessageToSender", () => {
    let messageBox = document.getElementById('message');
    let message = messageBox.value;
    messageBox.value = "";
    messageBox.disabled = false;

    let chat = document.getElementById("chat");
    chat.appendChild(createMessageElement(message, true));
    chat.scrollTop = chat.scrollHeight;
});

function sendMessage(recipent) {
    let messageBox = document.getElementById('message');
    let message = messageBox.value;
    messageBox.disabled = true;
    connection.invoke("SendMessage", message, recipent).catch((err) => {
        return console.error(err.toString());
    });
    event.preventDefault();
}

function createMessageElement(message, isUserMessage){
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(message));
    let div = document.createElement('div');
    div.appendChild(span);

    if (isUserMessage) {
        div.className = 'sent-message';
    } else {
        div.className = 'received-message';
    }

    return div;
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
        url: "/Chat/HandleMessage",
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