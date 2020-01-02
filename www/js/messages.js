
////////////////////// get mensajes y chat

var ultimoMensaje = 0;

document.addEventListener("deviceready", function () {

    //variables del chat
    var chat = $("#chat");

    //variable del nav
    var nav = $("#nav");
    var home = $("#HomeButton");
    var qCreate = $("#MakeQuery");

    //variabes de consultas
    var query = $("#queries");
    var title = $("#title");
    var descrip = $("#descrip");

    var consultas = $("#consultas");

    var formChat = $("#formm");
    var descrip = $("#descrip");

    var ultimoMensaje = 0;

    var settingsGetMensajes = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8000/mensaje/getAll",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
        },
        "processData": true,
        "data": ""
    }

    formChat.submit(function (e) {
        e.preventDefault();
        alert("ZSZCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        alert(parseInt(window.localStorage.getItem("consulta"), 10) + "/" +
            parseInt(window.localStorage.getItem("token"), 10));
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/mensaje/mensaje",
            data: JSON.stringify({
                consultaId: parseInt(window.localStorage.getItem("consulta"), 10),
                mensaje: descrip.val(),
                emisorId: parseInt(window.localStorage.getItem("token"), 10)
            }),
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            success: function (respuesta) {
                console.log(JSON.stringify({
                    consultaId: parseInt(window.localStorage.getItem("consulta"), 10),
                    mensaje: descrip.val(),
                    emisorId: parseInt(window.localStorage.getItem("token"), 10)
                }));
                descargarChats();
            },
            error: function () {
                console.log("No se ha podido obtener la información");
            }
        });

        descrip.val('');
        return false;
    });

    descargarChats();
    var chatDaemon = setInterval(descargarChats, 5000);

    home.click(function () {
        window.location.href = "/menu.html";

    });

    chat.click(function () {
        window.location.href = "/messages.html";
    });

    qCreate.click(function () {
           window.location.href = "/menu.html";
    });

});

function descargarChats() {


    $.ajax(settingsGetMensajes).done(function(response){
        response.forEach(element => {
            console.log("xd"+mensaje);
            
        });
    });


}