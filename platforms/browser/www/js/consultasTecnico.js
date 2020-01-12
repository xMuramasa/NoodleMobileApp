$(document).ready(function () {


    //variables del chat
    let chat = $("#chat");

    //variable del nav
    let nav = $("#nav");
    let home = $("#HomeButton");

    //variabes de consultas
    let query = $("#queries");
    let title = $("#title");
    let descrip = $("#descrip");

    let consultas = $("#consultas");

    var ultimoMensaje = 0;


    var usrId = parseInt(window.localStorage.getItem("token"),10);

    let settingsGetConsultas = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8000/consulta/getAll",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
        },
        "processData": true,
        "data": ""
    }


    //////////////////// get consultas
    $.ajax(settingsGetConsultas).done(function(respuesta){
            respuesta.forEach(element => {
                if(element["tecnicoId"] === usrId){
                    consultastecnico.append(' <br>                                           \
                    <div class="card">                                                       \
                        <div class="card-body">                                              \
                            <h5 class="card-title">Consulta '+ element["titulo"] + '</h5>    \
                            <p class="card-text">Cliente: '+ element["usuarioId"] + '</p>    \
                            <a href="/messages.html" onclick="setConsulta('+ element["consultaId"] + ')"\
                            class="btn btn-primary">Ir al Chat</a>                           \
                        </div>                                                               \
                    </div>                                                                   \
                ');
                }
            });
    });

    /////////////////////End get consultas

    home.click(function () {
        window.location.href = "/menu.html";
    });

    chat.click(function () {
        window.location.href = "/messagestecnico.html";
    });

});

function setConsulta(idConsulta) {
    window.localStorage.setItem('consultatecnico', idConsulta.toString());
}