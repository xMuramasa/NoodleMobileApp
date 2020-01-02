

////////////////////// get mensajes y chat

document.addEventListener("deviceready", function () {
    descargarChats();
    var chatDaemon = setInterval(descargarChats, 5000);
});

function descargarChats() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/mensaje/" + window.localStorage.getItem("consulta") + "/" + ultimoMensaje.toString(),
        contentType: 'application/json',
        dataType: 'json',
        cache: false,
        success: function (respuesta) {
            if (respuesta.length > 0)
                ultimoMensaje = respuesta[respuesta.length - 1].id;

            for (var i = respuesta.length - 1; i >= 0; i--) {
                if (respuesta[i].emisor == 1) {
                    $("#chat").prepend('                                                                      \
                            <div class="col-8 card float-left">                                                                   \
                                <div class="card-body">                                                          \
                                    <h5 class="card-title">Tú</h5> \
                                    <p class="card-text">'+ respuesta[i].mensaje + '</p>                         \
                                </div>                                                                           \
                            </div>                                                                               \
                        ');
                } else {
                    $("#chat").prepend('                                                                      \
                            <div class="col-8 card float-right">                                                                   \
                                <div class="card-body">                                                          \
                                    <h5 class="card-title">Técnico</h5> \
                                    <p class="card-text">'+ respuesta[i].mensaje + '</p>                         \
                                </div>                                                                           \
                            </div>                                                                               \
                        ');
                }
            }
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
}

$("#formChat").submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
        url: "http://localhost:8000/mensaje/mensaje",
        data: JSON.stringify({ consulta: window.localStorage.getItem("consulta"), mensaje: $("#mensaje").val() }),
        contentType: 'application/json',
        dataType: 'json',
        cache: false,
        success: function (respuesta) {
            //console.log(respuesta);
            descargarChats();
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
    $("#mensaje").val('');
    return false;
});

home.click(function () {
    window.location.href = "/menu.html";

});

chat.click(function () {
    window.location.href = "/messages.html";
});

qCreate.click(function () {
    window.location.href = "/menu.html";
});