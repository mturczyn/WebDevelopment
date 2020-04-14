'use strict';

disableMessagesScreen();

// Do trzymania ID użytkownika.
var conversationUserId;
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
    let userRow = document.getElementById(userIdentifier.toString());
    let userCell = userRow.firstElementChild;
    if (userCell) {
        let activeMark = document.createElement("div");
        activeMark.className = 'active-user';
        userCell.firstElementChild(activeMark);
        return;
    }
    console.warn(`Nie znaleziono użytkownika ${userIdentifier}`);
});

connection.on("ReceiveMessage", (message, messageUUID, sentBy) => {
    let messagesScreen = document.querySelector("div.messages-screen");
    messagesScreen.appendChild(createMessageElement(message, false));
    messagesScreen.scrollTop = messagesScreen.scrollHeight;
    connection.invoke("ConfirmMessage", messageUUID, sentBy).catch((err) => {
        return console.error(err.toString());
    });
});

connection.on("ConfirmMessageToSender", (messageUUID) => {
    let messageText = document.getElementById('message-text');
    let message = messageText.value;
    messageText.value = "";
    messageText.disabled = false;

    let messagesScreen = document.querySelector("div.messages-screen");
    messagesScreen.appendChild(createMessageElement(message, true));
    messagesScreen.scrollTop = messagesScreen.scrollHeight;
});

/**
 * Funkcja wysyłająca wiadomość do wskazanego odbiorc.
 * @param {string} recipent Login odbiorcy.
 */
function sendMessage() {
    if (!conversationUserId) {
        console.warn("Nie wybrano żadnego użytkownika.");
        return;
    }
    let messageText = document.getElementById('message-text');
    let message = messageText.value;
    messageText.disabled = true;
    let messageUUID = generateUUID();
    connection.invoke("SendMessage", message, conversationUserId.toString(), messageUUID).catch((err) => {
        return console.error(err.toString());
    });
    event.preventDefault();
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

/**
 * Rozpoczyna rozmowę z użytkownikiem.
 * @param {number} userId ID użytkownika.
 */
function startConversationWithUser(userId) {
    conversationUserId = userId;

    let messagesScreen = document.querySelector("div.messages-screen");
    // Czyścimy jakąkolwiek zawartość, zostawaiając
    // tylko komunikat o wybranym użytkowniku.
    while (messagesScreen.childElementCount.length > 1) {
        messagesScreen.removeChild(messagesScreen.lastElementChild);
    }

    let userInfo = messagesScreen.firstElementChild;
    userInfo.classList.add('conversation-user-animation');

    let name = 'Michał Turczyn';
    for (let i = 0; i < name.length; i++) {
        setTimeout(() => userInfo.innerText = name.slice(0, i + 1), 50 * i);
    }
}

/**Czyści czat z wiadomości oraz "zapomina" ID użytkownika, z którym prowadzilismy rozmowę.
 * Wyświetla na środku czatu odpowiednią informację.
 * Stan braku wybranego użytkownika do rozmowy.
 * */
function disableMessagesScreen() {
    conversationUserId = undefined;

    let messagesScreen = document.querySelector("div.messages-screen");
    // Czyścimy jakąkolwiek zawartość.
    while (messagesScreen.childElementCount > 1) {
        messagesScreen.removeChild(messagesScreen.lastElementChild);
    }
    let userInfo = messagesScreen.firstElementChild;
    userInfo.classList.remove('conversation-user-animation');
    userInfo.classList.add('conversation-information-no-user');
    userInfo.innerText = 'WYBIERZ UŻYTKOWNIKA DO ROZMOWY';
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