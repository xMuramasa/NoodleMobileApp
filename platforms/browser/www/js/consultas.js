$(document).ready(function () {


    //variables del chat
    let chat = $("#chat");

    //variable del nav
    let nav = $("#nav");
    let home = $("#HomeButton");
    let qCreate = $("#MakeQuery");

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


    ///////////////////// get consultas
    $.ajax(settingsGetConsultas).done(function(respuesta){
        var rev = respuesta.reverse();
        rev.forEach(element => {
            if(element["usuarioId"] === usrId){
                if(element["tecnicoId"] === -1){
                    consultas.append(' <br>                                                    \
                        <div class="card">                                                       \
                            <div class="card-body">                                              \
                                <h5 class="card-title">Consulta ' + element["titulo"] + '</h5><h5 style="color:red"> Sin Responder </h5>         \
                                <p class = "card-text" >Fecha: ' + element["fecha"] + '</p>    \
                                <p class="card-text">Cliente: ' + element["usuarioId"] + '</p>    \
                                <p class="card-text">Técnico: ' + element["tecnicoId"] + '</p>    \
                                <a href="/messages.html" onclick="setConsulta(' + element["consultaId"] + ')"\
                                class="btn btn-primary">Ir al Chat</a>                           \
                                <a href="/pagos.html" onclick="pagos(' + element["consultaId"] + ')"\
                                class="btn btn-primary">Terminar Consulta y Pagar</a>            \
                            </div>                                                               \
                        </div>                                                                   \
                    ');
                }
                else{
                    consultas.append(' <br>                                                    \
                        <div class="card">                                                       \
                            <div class="card-body">                                              \
                                <h5 class="card-title">Consulta ' + element["titulo"] + '</h5><h5 style="color:green">  Respondida </h5>         \
                                <p class="card-text">Fecha: ' + element["fecha"] + '</p>    \
                                <p class="card-text">Cliente: ' + element["usuarioId"] + '</p>    \
                                <p class="card-text">Técnico: ' + element["tecnicoId"] + '</p>    \
                                <a href="/messages.html" onclick="setConsulta(' + element["consultaId"] + ')"\
                                class="btn btn-primary">Ir al Chat</a>                           \
                                <a href="/pagos.html" onclick="pagos(' + element["consultaId"] + ')"\
                                class="btn btn-primary">Terminar Consulta y Pagar</a>            \
                            </div>                                                               \
                        </div>                                                                   \
                    ');
                }
            }           
        });
    });

    ///////////////////// End get consultas

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

function setConsulta(idConsulta) {
    window.localStorage.setItem('consulta', idConsulta.toString());
}

function pagos(idConsulta) {
    window.localStorage.setItem('consulta', idConsulta.toString());
}