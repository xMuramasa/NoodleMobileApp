//variables del chat
let chat = $("#chat");

//variable del nav
let nav = $("#nav");
let home = $("#homeButton");
let qCreate = $("#queryCreate");

//variabes de consultas
let query = $("#queries");
let title = $("#title");
let descrip = $("#descrip");



home.click(function () {
    alert("home")
    $("#form").fadeOut();
});

chat.click(function () {
    alert("chat")
    $("#form").fadeOut();
});

qCreate.click(function () {
    window.location.href = "/menu.html";
});
