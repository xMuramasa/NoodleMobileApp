
var ultimoMensaje = 0;

////////////////////// get mensajes y chat
$(document).ready(function () {

    //variable del nav
    var home = $("#HomeButton");
    var qCreate = $("#MakeQuery");

    //variabes de consultas
    var consultas = $("#MessagesButton");

    var formChat = $("#formm");
    var descrip = $("#descrip");

    descargarPago();

/*
    formChat.submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/mensaje/mensaje",
            data: JSON.stringify({
                consultaId: parseInt(window.localStorage.getItem("consulta"), 10),
                mensaje: descrip.val(),
                emisorId: parseInt(window.localStorage.getItem("type"), 10)
            }),
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            success: function (respuesta) {
                window.location.href = "/consultas.html";

            },
            error: function () {
                console.log("No se ha podido obtener la información");
            }
        });

        descrip.val('');
        return false;
    });
    */

    home.click(function () {
        if (parseInt(window.localStorage["type"]) === 0) {
            window.location.href = "/menu.html";
        } else {
            window.location.href = "/menutecnico.html";

        }

    });

    consultas.click(function () {
        if (parseInt(window.localStorage["type"]) === 0) {
            window.location.href = "/consultas.html";
        } else {
            window.location.href = "/consultastecnico.html";

        }
    });

    qCreate.click(function () {
        if (parseInt(window.localStorage["type"]) === 0) {
            window.location.href = "/menu.html";
        } else {
            window.location.href = "/menutecnico.html";

        }
    });

});


var settingsGetPagos = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:8000/consulta/consulta/?consultaId=" + window.localStorage["consulta"],
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
    },
    "processData": true,
    "data": ""
}

function descargarPago() {

    $.ajax(settingsGetPagos).done(function (response) {
        

        if (parseInt(response["consultaId"]) === parseInt(window.localStorage["consulta"])) {
                $("#pagar").append('<br><br>                                                                      \
                <div class="col-5 card float-left">                                                                   \
                    <div class="card-body">                                                          \
                        <h5 class = "card-title" > Consulta:' +response["titulo"] +'</h5> \
                        <p class = "card-text" > Cliente: ' + response["usuarioId"] + ' </p>                         \
                        <p class = "card-text" > Tecnico: ' + response["tecnicoId"] + ' </p>                   \
                    </div>                                                                           \
                </div> <br><br>                                                                      \
            ');
        }
    });

}