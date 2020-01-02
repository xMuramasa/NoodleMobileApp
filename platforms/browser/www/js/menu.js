$(document).ready(function () {

    //variables del chat
    let chat = $("#MessagesButton");

    //variable del nav
    let nav = $("#nav");
    let home = $("#HomeButton");
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
            'Access-Control-Allow-Origin':'*',
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
                        usrId = parseInt(element["id"], 10);
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
            usrId = parseInt(window.localStorage.getItem("token"), 10);
            $.ajax({
                type: "POST",
                url: "http://localhost:8000/consulta/consulta",// api url
                data: JSON.stringify({
                    titulo: title.val(), descripcion: descrip.val(),
                    fecha: date.toDateString(), 
                    usuarioId: usrId,
                }),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    console.log("xd");
                },
                failure: function (errMsg) { console.log("lmao") }
            });
            nav.append("<h6 style='color: black; font - size: 2.5em; text-align: center'><br>Cosulta Realizada</h6>");
            query.fadeOut();
        }
    });

   home.click(function () {
       $("#form").fadeOut();
    });

    chat.click(function () {
        window.location.href = "/consultas.html";
    });


    qCreate.click(function () {
        query.fadeIn();
    });

    
    nav.hide();
})