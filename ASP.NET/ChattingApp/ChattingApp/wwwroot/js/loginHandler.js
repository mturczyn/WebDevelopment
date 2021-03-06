﻿'use strict';

var hostUrl;

function handleLogin() {
    var username = $('input[name$="loginName"]').val();
    var password = $('input[name$="passwordInput"]').val();

    var json = {
        username: username,
        password: password,
    };

    $.ajax({
        type: "post",
        dataType: "json",
        data: { "json": JSON.stringify(json) },
        url: hostUrl,
        success: function (data) {
            if (data.status) {
                alert("Successfull login.");
                window.location.href = data.redirect;
            }
            else {
                alert(data.message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}