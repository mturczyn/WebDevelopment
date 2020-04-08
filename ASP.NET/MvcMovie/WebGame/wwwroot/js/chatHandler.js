'use strict';

/**
 * Funckcja generująca globalnie unikatowy identyfikator (GUID).
 * Źródło: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

connection.on("UserConnectionChanged", (userIdentifier, connected) => {
    let userCell = document.querySelector(`#${userIdentifier} :first-child`);
    if (userCell) {
        let activeMark = document.createElement("div");
        activeMark.className = 'active-user';
        userCell.appendChild(activeMark);
        return;
    }
    console.warn(`Nie znaleziono użytkownika ${userIdentifier}`);
});

connection.on("ReceiveMessage", (message, messageUUID, sentBy) => {
    let chat = document.getElementById("chat");
    chat.appendChild(createMessageElement(message, false));
    chat.scrollTop = chat.scrollHeight;
    connection.invoke("ConfirmMessage", messageUUID, sentBy).catch((err) => {
        return console.error(err.toString());
    });
});

connection.on("ConfirmMessageToSender", (messageUUID) => {
    let messageBox = document.getElementById('message');
    let message = messageBox.value;
    messageBox.value = "";
    messageBox.disabled = false;

    let chat = document.getElementById("chat");
    chat.appendChild(createMessageElement(message, true));
    chat.scrollTop = chat.scrollHeight;
});

/**
 * Funkcja wysyłająca wiadomość do wskazanego odbiorc.
 * @param {string} recipent Login odbiorcy.
 */
function sendMessage(recipentId) {
    let messageBox = document.getElementById('message');
    let message = messageBox.value;
    messageBox.disabled = true;
    let messageUUID = generateUUID();
    connection.invoke("SendMessage", message, recipentId, messageUUID).catch((err) => {
        return console.error(err.toString());
    });
    event.preventDefault();
}

var conversationUserId;
/**
 * Rozpoczyna rozmowę z użytkownikiem.
 * @param {number} userId ID użytkownika.
 */
function startConversationWithUser(userId) {
    conversationUserId = userId;
}

/**
 * Funkcja generująca element HTML czatu, zawierający wiadomość.
 * @param {string} message Treść wiadomości.
 * @param {bool} isUserMessage Czy jest to wiadomość wysłana przez uzytkownika, czy odebrana.
 */
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