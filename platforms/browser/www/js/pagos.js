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

var settingsDel = {
    "url": "http://localhost:8000/consulta/consulta/" + window.localStorage["consulta"],
    "method": "DELETE",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": "",
};


////////////////////// pagos
$(document).ready(function () {

    //variable del nav
    var home = $("#HomeButton");
    var qCreate = $("#MakeQuery");

    //variabes de consultas
    var consultas = $("#MessagesButton");

    var formChat = $("#formPago");
    var descrip = $("#descrip");

    // descargarPago();

    var resp;

    $.ajax(settingsGetPagos).done(function (response) {

        resp = response;

        if (parseInt(response["consultaId"]) === parseInt(window.localStorage["consulta"])) {
            $("#pagar").append('<br><br>                                                                      \
            <div class="col-5 card float-left">                                                                   \
                <div class="card-body">                                                          \
                    <h5 class = "card-title" > Consulta:' + response["titulo"] + '</h5> \
                    <p class = "card-text" > Cliente: ' + response["usuarioId"] + ' </p>                         \
                    <p class = "card-text" > Tecnico: ' + response["tecnicoId"] + ' </p>                   \
                </div>                                                                           \
            </div> <br><br>                                                                      \
        ');
        }
    });


    formChat.submit(function (e) {
        e.preventDefault();
        let date = new Date();
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/pago/pago",
            data: JSON.stringify({
                consultaId: parseInt(window.localStorage.getItem("consulta"), 10),
                monto: descrip.val(),
                fecha: date.toDateString(),
                clienteId: resp["usuarioId"],
                tecnicoId: resp["tecnicoId"]
            }),
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            success: function (respuesta) {
                $.ajax(settingsDel).done(function (response) {
                    console.log(response);
                });
                window.location.href = "/consultas.html";

            },
            error: function () {
                console.log("No se ha podido obtener la información");
            }
        });

        descrip.val('');
        return false;
    });

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


