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