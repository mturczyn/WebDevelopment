var i = 0;

function timedCount() {
    i = i + 1;
    //The important part of the code is the postMessage() method - which is used to post a message back to the HTML page.
    postMessage(i);
    setTimeout("timedCount()", 500);
}

timedCount();
