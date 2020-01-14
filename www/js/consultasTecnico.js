$(document).ready(function () {


    //variable del nav
    let home = $("#HomeButton");
    let consultas = $("#consultasclientes");

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

    var pagos = {
        "url": "http://localhost:8000/pago/getAll",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
    };

    $.ajax(pagos).done(function (response) {
        response.forEach(pago =>{
            if (pago["tecnicoId"] === usrId){
                alert("AVISO DE PAGO!\nCliente: "+pago["clienteId"]+"\nHa pagado: "+pago["monto"]+"\nPor la Consulta: "+pago["consultaId"]);
            }
        })
    });


    //////////////////// get consultas
    $.ajax(settingsGetConsultas).done(function(respuesta){
        respuesta.forEach(element => {
            if (element["tecnicoId"] === usrId) {
                if(element["visita"] === 1){
                    consultas.append(' <br>                                                    \
                            <div class="card">                                                       \
                                <div class="card-body">                                              \
                                    <h5 class="card-title">Consulta ' + element["titulo"] + '</h5><h5 style="color:green">  Respondida </h5>         \
                                    <h5 style = "color:orange" > Visita Agendada </h5>   \
                                    <p class="card-text">Fecha: ' + element["fecha"] + '</p>    \
                                    <p class="card-text">Cliente: ' + element["usuarioId"] + '</p>    \
                                    <a href="/messagestecnico.html" onclick="setConsulta(' + element["consultaId"] + ')"\
                                    class="btn btn-primary">Ir al Chat</a>\
                                </div>                                                               \
                            </div>                                                                   \
                        ');
                }
                else{
                
                    consultas.append(' <br>                                           \
                        <div class="card">                                                       \
                            <div class="card-body">                                              \
                                <h5 class="card-title">Consulta ' + element["titulo"] + '</h5>    \
                                <p class="card-text">Fecha: ' + element["fecha"] + '</p>    \
                                <p class="card-text">Cliente: ' + element["usuarioId"] + '</p>    \
                                <a href="/messagestecnico.html" onclick="setConsulta(' + element["consultaId"] + ')"\
                                class="btn btn-primary">Ir al Chat</a>                           \
                            </div>                                                               \
                        </div>                                                                   \
                    ');
                }
            }
        });
    });

    /////////////////////End get consultas

    home.click(function () {
        window.location.href = "/menuTecnico.html";
    });

    $("#MessagesButton").click(function () {
        window.location.href = "/messagestecnico.html";
    });

});

function setConsulta(idConsulta) {
    window.localStorage.setItem('consulta', idConsulta.toString());
}