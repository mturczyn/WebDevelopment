connection.on("UserConnectionChanged", (userIdentifier, connected) => {
    let userRow = document.querySelector(`#${userIdentifier} :last-child`);
    if (userRow) {
        userRow.style.background = connected ? 'lightgreen' : 'white';
        return;
    }
    console.warn(`Nie znaleziono użytkownika ${userIdentifier}`);
});