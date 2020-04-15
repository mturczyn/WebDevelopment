'use strict';

disableMessagesScreen();
getUsersList();
markUsersWithUnreadMessages();

// Do trzymania ID użytkownika.
var conversationUser;
var usersList;
// Do cache'owania historii rozmów, aby zredukować ruch sieciowy.
var conversationHistory = new Map();
/**Zwraca listę użytkowników, od których zalogowany użytkownik
 * ma nieprzeczytane wiadomości.
 * */
function checkUnreadMessages() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Chat/GetUnreadMessagesUsers', false);
    xhr.send();
    if (!xhr.response) {
        console.warn("Nie powiodło się pobieranie użytkowników,  od których mieliśmy nieprzeczytane wiadomości.");
        return;
    }
    return JSON.parse(xhr.response);
}

/**Podświetla n liście użytkowników odpowiednich uzytkowników, od których
 * mamy nieprzeczytane wiadomości. */
function markUsersWithUnreadMessages() {
    let usersWithUnreadMessages = checkUnreadMessages();
    for (let userId of usersWithUnreadMessages) {
        document.getElementById(userId.toString()).classList.add('unread-message-from-user');
    }
}

/**Funckja pobierająca listę użytkowników. */
function getUsersList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Chat/GetAllUsers', false);
    xhr.send();
    if (!xhr.response) {
        console.warn("Nie powiodło się pobieranie użytkowników z serwera.");
        usersList = null;
        return;
    }
    usersList = JSON.parse(xhr.response);
}
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
        activeMark.className = 'active-user-mark';
        userCell.innerHTML = activeMark.outerHTML;
        return;
    }
    console.warn(`Nie znaleziono użytkownika ${userIdentifier}`);
});

connection.on("ReceiveMessage", (message) => {
    let msg = JSON.parse(message);
    // Jeśli już cache'owaliśmy wiadomości, to dodajemy ja od razu.
    if (conversationHistory.has(msg.sentBy)) {
        conversationHistory.get(msg.sentBy).push(msg);
    }

    if (!conversationUser || msg.sentBy != conversationUser.id) {
        document.getElementById(msg.sentBy).classList.add('unread-message-from-user');
    }
    else {
        let messagesScreen = document.querySelector("div.messages-screen");
        messagesScreen.appendChild(createMessageElement(msg.messageText, false));
        messagesScreen.scrollTop = messagesScreen.scrollHeight;
        msg.isRead = true;
    }

    connection.invoke("ConfirmMessage", msg.id.toString(), msg.sentBy.toString(), msg.isRead).catch((err) => {
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
    if (!conversationUser) {
        console.warn("Nie wybrano żadnego użytkownika.");
        return;
    }
    let messageText = document.getElementById('message-text');
    let message = messageText.value;
    messageText.disabled = true;
    let messageUUID = generateUUID();
    connection.invoke("SendMessage", message, conversationUser.id.toString(), messageUUID).catch((err) => {
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
    if (conversationUser && conversationUser.id == userId) {
        disableMessagesScreen();
        return;
    }

    conversationUser = usersList.filter(u => u.id == userId)[0];

    if (!conversationUser) {
        console.warn(`Nie mieliśmy na liście użytkownika o ID ${userId}.`);
        return;
    }
    // Jeśli mieliśmy nieprzeczytane wiadomości od danego użytkownika,
    // kończymy animację wksazującą ten fakt.
    document.getElementById(userId.toString()).classList.remove('unread-message-from-user');

    markMessagesAsRead(userId);

    let messagesScreen = document.querySelector("div.messages-screen");
    // Czyścimy jakąkolwiek zawartość, zostawaiając
    // tylko komunikat o wybranym użytkowniku.
    while (messagesScreen.childElementCount > 1) {
        messagesScreen.removeChild(messagesScreen.lastElementChild);
    }

    let userInfo = messagesScreen.firstElementChild;
    userInfo.classList.add('conversation-user-animation');

    let name = conversationUser.firstName + " " + conversationUser.lastName;
    
    let promise = Promise.resolve(null);
    for (let i = 0; i < name.length; i++) {
        promise = promise.then((result) => {
            return new Promise((resolve, reject) => {
                userInfo.innerText = result;
                setTimeout(() => resolve(name.slice(0, i + 1)), 50)
            })
        })
    }
    promise.then((result) => {
        userInfo.innerText = result;
        let chatHistoryWithUser = getChatHistory(conversationUser.id);
        for (let message of chatHistoryWithUser) {
            messagesScreen.appendChild(createMessageElement(message.messageText, conversationUser.id == message.sentTo));
        }
        messagesScreen.scrollTop = messagesScreen.scrollHeight;
    });
}

/**
 *  Oznacza jako przeczytane wszystkie wiadomości od danego
 *  użytkownika.
 * @param {any} userId ID użytkownika, od którego mamy wiadomości.
 */
function markMessagesAsRead(userId) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/Chat/MarkMessagesAsRead', false);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        console.log(`Odpowiedź z serwera: readyState = ${xhr.readyState}, status = ${xhr.status}`)
    };
    xhr.send('userId=' + userId);

    if (xhr.status == 500) {
        alert("Coś poszło źle!");
    }
}

/**
 * Pobiera historię czatu z danym użytkownikiem.
 * Uwaga: dodatkowo cache'uje je w obiekcie Map.
 * @param {number} userId ID użytkownika.
 */
function getChatHistory(userId) {
    if (!conversationHistory.has(userId)) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/Chat/GetChatHistory?userId=' + userId, false);
        xhr.send();
        if (!xhr.response) {
            console.warn("Nie powiodło się pobieranie historii konwersacji z serwera.");
            conversationHistory = null;
            return;
        }
        conversationHistory.set(userId, JSON.parse(xhr.response));
    }

    return conversationHistory.get(userId);
}

/**Czyści czat z wiadomości oraz "zapomina" ID użytkownika, z którym prowadzilismy rozmowę.
 * Wyświetla na środku czatu odpowiednią informację.
 * Stan braku wybranego użytkownika do rozmowy.
 * */
function disableMessagesScreen() {
    conversationUser = null;

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