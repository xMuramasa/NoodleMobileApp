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
var ultimoMensaje = 0;

////////////////////// get mensajes y chat
$(document).ready(function () {
    

    //variables del chat
    var chat = $("#chat");

    //variable del nav
    var home = $("#HomeButton");
    var qCreate = $("#MakeQuery");

    //variabes de consultas
    var consultas = $("#MessagesButton");

    var formChat = $("#formm");
    var descrip = $("#descrip");

    descargarChats();
    var chatDaemon = setInterval(descargarChats, 500000);


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
                descargarChats();
            },
            error: function () {
                console.log("No se ha podido obtener la información");
            }
        });

        descrip.val('');
        return false;
    });

    home.click(function () {
        if (parseInt(window.localStorage["type"]) === 0){
            window.location.href = "/menu.html";
        }
        else{
            window.location.href = "/menutecnico.html";

        }

    });

    consultas.click(function () {
        if (parseInt(window.localStorage["type"]) === 0){
            window.location.href = "/consultas.html";
        }
        else{
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

function descargarChats() {

    
    $.ajax(settingsGetMensajes).done(function(response){
        response.forEach(element => {
        
            if(parseInt(element["consultaId"]) === parseInt(window.localStorage["consulta"])){
                if (element.length > 0)
                    ultimoMensaje = element[element.length - 1].id;

                if (parseInt(window.localStorage["type"]) === 0) {
                    if (element["emisorId"] == 0) {
                        $("#chat").append('<br><br>                                                                      \
                        <div class="col-8 card float-left">                                                                   \
                            <div class="card-body">                                                          \
                                <h5 class="card-title">Tú</h5> \
                                <p class="card-text">' + element["mensaje"] + '</p>                         \
                            </div>                                                                           \
                        </div> <br><br>                                                                               \
                    ');
                    } else {
                        $("#chat").append('<br><br>                                                                      \
                        <div class="col-8 card float-right">                                                                   \
                            <div class="card-body">                                                          \
                                <h5 class="card-title">Técnico</h5> \
                                <p class="card-text">' + element["mensaje"] + '</p>                         \
                            </div>                                                                           \
                        </div> <br><br>                                                                               \
                    ');
                    }
                } else {
                    if (element["emisorId"] == 0) {
                        $("#chat").append('<br><br>                                                                      \
                    <div class="col-8 card float-right">                                                                   \
                        <div class="card-body">                                                          \
                            <h5 class="card-title">Cliente</h5> \
                            <p class="card-text">' + element["mensaje"] + '</p>                         \
                        </div>                                                                           \
                    </div> <br><br>                                                                               \
                ');
                    } else {
                        $("#chat").append('<br><br>                                                                      \
                    <div class="col-8 card float-left">                                                                   \
                        <div class="card-body">                                                          \
                            <h5 class="card-title">Tú</h5> \
                            <p class="card-text">' + element["mensaje"] + '</p>                         \
                        </div>                                                                           \
                    </div> <br><br>                                                                               \
                ');
                    }
                
                }

            }
        });
    });

}