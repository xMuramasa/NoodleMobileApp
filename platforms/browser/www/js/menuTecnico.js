$(document).ready(function () {

    //variables del chat
    let chat = $("#MessagesButton");

    //variable del nav
    let nav = $("#nav");
    let home = $("#HomeButton");
    let Cconsultas = $("#ClientQueries");

    //variables de consultas
    let query = $("#queries");
    let title = $("#title");
    let descrip = $("#descrip");


    // settings de postman para get, con esto funciona sin problemas
    let settingsGETall = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8000/tecnico/getAll",
        "method": "GET",
        "headers": {
            'Access-Control-Allow-Origin':'*',
            "Content-Type": "application/json",
        },
        "processData": true,
        "data": ""
    }

    let usrId = "";
    let getID = function () { //¿es necesario, siendo que ya se había registrado el id en el login?
        $.ajax(settingsGETall).done(function (response) {
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


    home.click(function () {
       $("#form").fadeOut();
    });

    chat.click(function () {
        window.location.href = "/consultastecnico.html";
    });

    Cconsultas.click(function () {
        window.location.href = "/";
    });


    nav.hide();
})