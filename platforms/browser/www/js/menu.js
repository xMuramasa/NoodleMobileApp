$(document).ready(function () {

    //variables del chat
    let chat = $("#chat");

    //variable del nav
    let nav = $("#nav");
    let home = $("#homeButton");
    let qCreate = $("#queryCreate");

    //variabes de consultas
    let query = $("#queries");
    let title = $("#title");
    let descrip = $("#descrip");


    // settings de postman para get, con esto funciona sin problemas
    let settingsGET = {
        "async": true,
        "crossDomain": true,
        "url": "https://noodle-project-anal.herokuapp.com/cliente/getAll",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
        },
        "processData": true,
        "data": ""
    }


    query.submit(function (e) {//yay
        e.preventDefault();
        if ((title.val() !== "") && (descrip.val() !== "")) {
            getID();
            let date = new Date();
            $.ajax({
                type: "POST",
                url: "https://noodle-project-anal.herokuapp.com/consulta/consulta",// api url
                data: JSON.stringify({
                    titulo: title.val(), descripcion: descrip.val(),
                    fecha_hora: date.toDateString(), usuarioId: usrId,
                }),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    console.log(JSON.stringify({
                        titulo: title.val(), descripcion: descrip.val(),
                        fecha_hora: date.toDateString(), usuarioId: usrId,
                    }));
                },
                failure: function (errMsg) { console.log("lmao") }
            });
            nav.append("<h6 style='color: black; font - size: 2.5em; text-align: center'><br>Cosulta Realizada</h6>");
            query.fadeOut();
        }
    });

    nav.submit(function (e) {

        e.preventDefault();
        if (qCreate) {
            query.fadeIn();
        }
        if (home) {
            $("#form").fadeOut();
        }
    });


    query.hide();
    register.hide();
    nav.hide();
    chat.hide();
})