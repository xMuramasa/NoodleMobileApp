$(document).ready(function () {

    //variable del nav
    let nav = $("#nav");
    let home = $("#HomeButton");

    //variables de consultas
    let query = $("#queries");
    let title = $("#title");
    let descrip = $("#descrip");

    let consultasClientes = $("#consultasclientes");

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
                if(element["tecnicoId"] === -1){
                    consultasClientes.append(' <br>                                          \
                    <div class="card">                                                       \
                        <div class="card-body">                                              \
                            <h5 class="card-title">Consulta '+ element["titulo"] + '</h5>    \
                            <p class="card-text">Cliente: '+ element["usuarioId"] + '</p>    \
                            <a href="/messagesTecnico.html" onclick="setConsulta('+ element["consultaId"] + ')"\
                            class="btn btn-primary">Ir al Chat</a>                           \
                        </div>                                                               \
                    </div>                                                                   \
                    ');
                }
            });
    });

});

function setConsulta(idConsulta) {
    window.localStorage.setItem('consulta', idConsulta);
    var usrId = parseInt(window.localStorage.getItem("token"),10);

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

    $.ajax(settingsGetPagos).done(function (response) {

        var settings = {
            "url": "http://localhost:8000/consulta/consulta/",
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "consultaId": response["consultaId"],
                "descripcion": response["descripcion"],
                "fecha": response["fecha"],
                "tecnicoId":    usrId,
                "titulo": response["titulo"],
                "usuarioId": response["usuarioId"]
            }),
        };
        
        $.ajax(settings).done(function (response) {
            alert("lamao")
        });
    });
    /*
    $.ajax({
        type: "PUT",
        url: "http://localhost:8000/consulta/consulta?consultaId=" + idConsulta,// api url
        data: JSON.stringify({tecnicoId: idTecnico,
                            consultaId: idConsulta,
                            descripcion: desc,
                            titulo: title, 
                            fecha: date,
                            usuarioId: idUsuario,
        }),
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            console.log("vamo shile");
        },
        failure: function (errMsg) { console.log("N000") }
    });*/
}