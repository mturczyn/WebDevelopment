'use strict';

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")//, { accessTokenFactory: () => this.loginToken })
    .build();

connection.start().then(() => {
    console.log("SignalR: Start komunikacji...");
}).catch((err) => {
    return console.error(err.toString());
});