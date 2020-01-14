$(document).ready(function () {

    //variable del nav
    let home = $("#HomeButton");

    //variables de consultas
    let title = $("#MessagesButton");

    let consultasClientes = $("#consultasclientes");

    let settingsGETall = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8000/tecnico/getAll",
        "method": "GET",
        "headers": {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
        },
        "processData": true,
        "data": ""
    }

    let usrId = "";
    let getID = function () {
        $.ajax(settingsGETall).done(function (response) {
            // this is pretty hardcore lmao; 
            //se trunca la tabal del json en id, porque este no se necesita
            response.forEach(element => {
                if (window.localStorage.getItem("token") === "") {
                    if ((element["nombre"] === localStorage["name"]) &&
                        (element["pass"] === localStorage["pass"])) {
                        usrId = parseInt(element["id"], 10);
                        window.localStorage.setItem("token", usrId);
                    }
                }
            });
        })
    }

    getID();

    //////////////////// get consultas
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
    $.ajax(settingsGetConsultas).done(function (respuesta) {
        respuesta.forEach(element => {
        if (element["tecnicoId"] === -1) {
            consultasClientes.append(' <br>                                                    \
                <div class="card">                                                       \
                    <div class="card-body">                                              \
                        <h5 class="card-title">Consulta ' + element["titulo"] + '</h5><h5 style="color:red"> Sin Responder </h5>         \
                        <p class = "card-text" >Fecha: ' + element["fecha"] + '</p>    \
                        <p class="card-text">Cliente: ' + element["usuarioId"] + '</p>    \
                        <p class="card-text">Técnico: ' + element["tecnicoId"] + '</p>    \
                        <a href="/messagestecnico.html" onclick="setConsulta(' + element["consultaId"] + ')"\
                        class="btn btn-primary">Ir al Chat</a>                           \
                    </div>                                                               \
                </div>                                                                   \
            ')};
        });
    });

    home.click(function () {
        window.location.href = "/menuTecnico.html";
    });

    title.click(function () {
        window.location.href = "/consultastecnico.html";
    });

});


function setConsulta(idConsulta) {
    window.localStorage.setItem('consulta', idConsulta);
}

