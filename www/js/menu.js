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
    let settingsGETall = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8000/cliente/getAll",
        "method": "GET",
        "headers": {
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
                if (window.localStorage.getItem("token") === ""){
                    if ((element["nombre"] === window.localStorage.getItem("name")) && 
                    (element["pass"] === window.localStorage.getItem("pass"))) {
                        usrId = element["id"];
                        parseInt(usrId, 10);
                        window.localStorage.setItem("token", usrId);
                    }
                }
            });
        })
    }
    getID();

    query.submit(function (e) {//yay
        e.preventDefault();
        if ((title.val() !== "") && (descrip.val() !== "")) {
            // https://noodle-project-anal.herokuapp.com
            let date = new Date();
            $.ajax({
                type: "POST",
                url: "http://localhost:8000/consulta/consulta",// api url
                data: JSON.stringify({
                    titulo: title.val(), descripcion: descrip.val(),
                    fecha_hora: date.toDateString().toLowerCase(), 
                    usuarioId: parseInt(usrId,10),
                }),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    console.log(JSON.stringify({
                        titulo: title.val(), descripcion: descrip.val(),
                        fecha_hora: date, usuarioId: window.localStorage.getItem("token"),
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