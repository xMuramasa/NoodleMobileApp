$(document).ready(function () {

    //variables del chat
    let chat = $("#chat");

    //variable del nav
    let nav = $("#nav");
    let home = $("#homeButton");
    let qCreate = $("#MakeQuery");

    //variabes de consultas
    let query = $("#queries");
    let title = $("#title");
    let descrip = $("#descrip");


    // settings de postman para get, con esto funciona sin problemas
    let settingsGET = {
        "async": true,
        "crossDomain": true,
        "url": " https://localhost:8000/cliente/getAll",
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
            // https://noodle-project-anal.herokuapp.com
            let date = new Date();
            $.ajax({
                type: "POST",
                url: " https://localhost:8000/consulta/consulta",// api url
                data: JSON.stringify({
                    titulo: title.val(), descripcion: descrip.val(),
                    fecha_hora: date.toDateString(), usuarioId: 1,//window.localStorage.getItem("token"),
                }),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    alert("good");
                    console.log(JSON.stringify({
                        titulo: title.val(), descripcion: descrip.val(),
                        fecha_hora: date.toDateString(), usuarioId: window.localStorage.getItem("token"),
                    }));
                },
                failure: function (errMsg) { alert("lmao") }
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


    
    nav.hide();
})