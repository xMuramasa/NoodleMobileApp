$(document).ready(function(){

    let flag = false;

    //variables del login
    let login = $("#login");
    let userLogin = $("#userLogin");
    let passLogin = $("#passLogin");
    let user = { nombre: userLogin.val(), pass: passLogin.val() };
    let redirReg = $("#redirReg");

    //variables del registro
    let register = $("#register"); 
    let userReg = $("#userReg");
    let passReg = $("#passReg");
    let tecnico = $("#tecnico");
    let user2 = { nombre: userReg.val(), pass: passReg.val() };

    //session
    var usrId ="";
    var getID = function(){
        $.ajax(settingsGET).done(function (response) {
            // this is pretty hardcore lmao; 
            //se trunca la tabal del json en id, porque este no se necesita
            response.forEach(element => {
                if ((element["nombre"] === userLogin.val()) 
                        && (element["pass"] === passLogin.val())) {
                    usrId = element["id"];
                }
            });
        })

    }

    // settings de postman para get, con esto funciona sin problemas
    let settingsGET = {
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
    register.fadeOut();
//////////////////////////////////////////// Begin Login & Registro
    //funcion de login
    login.submit(function(e){
        // prevenir el comportamiento por defecto del form
        e.preventDefault();  
        // check si los campos estan vacios
        if((userLogin.val() !== "") && (passLogin.val() !== "")){
            //usar ajax para la respuesta
            $.ajax(settingsGET).done(function (response) {
                // this is pretty hardcore lmao; 
                //se trunca la tabal del json en id, porque este no se necesita
                response.forEach(element => { 
                    if ((element["nombre"] === userLogin.val()) && (element["pass"] === passLogin.val())){
                            usrId = element["id"];
                            flag =true;
                            console.log(usrId);
                    }
                    delete element["id"]; });
                // esta wea es la raja
                if (flag){
                    // cambio de estado de la pagina
                    console.log(JSON.stringify({
                        nombre: userLogin.val(),
                        pass: passLogin.val(),
                    }),);
                    window.localStorage.setItem("token", usrId);
                    window.localStorage.setItem("name", userLogin.val());
                    window.localStorage.setItem("pass", passLogin.val());

                    window.location.href = "/menu.html";
                    login.fadeOut();
                    redirReg.fadeOut();
                    nav.fadeIn();
                } else {
                    //usuario no registrado
                    login.append("<h6 style='color: white; font - size: 2.5em; text-align: center'><br>Ususario no existe</h6>");
                }
            });
        }else {
            //en caso de que los campos se encuentren vacios
            login.append("<h6 style='color: white; font - size: 2.5em; text-align: center'><br>No se permiten campos vacíos</h6>"); 
        }
    }); 

    // funcion que lleva a registro en la database
    redirReg.submit(function (e) {
        e.preventDefault();
        login.fadeOut();
        tecnico.fadeOut();
        redirReg.fadeOut();
        register.fadeIn();
    });

    register.submit(function(e){
        // prevenir el comportamiento por defecto del form
        e.preventDefault();
        // check si los campos estan vacios
        if ((userReg.val() !== "") && (passReg.val() !== "")) {
            //usar ajax para el get 
            $.ajax(settingsGET).done(function (response) {
                // this is pretty hardcore lmao; 
                //se trunca la tabal del json en id, porque este no se necesita
                response.forEach(element => { 
                    if ((element["nombre"] === userLogin.val()) && (element["pass"] === passLogin.val())) {
                        usrId = element["id"];
                        flag = true;
                    }
                    delete element["id"];
                 });
                // esta wea es la raja
                //check if user in NOT database
                if (!flag){
                    $.ajax({
                        url: 'http://localhost:8000/cliente/cliente',
                        type: 'POST',
                        data: JSON.stringify({
                            nombre: userReg.val(),
                            pass: passReg.val(),
                        }),
                        dataType: 'json',
                        contentType: "application/json",
                        success: function (data) {
                            window.localStorage.setItem("token","");
                            window.localStorage.setItem("name", userReg.val());
                            window.localStorage.setItem("pass", passReg.val());
                            window.location.href = "/menu.html";
                            register.fadeOut();
                        },
                        error: function (request, error) {
                            console.log("Error : " + JSON.stringify(request));
                        }
                    });
                } else {
                    //usuario registrado
                    register.append("<h6 style='color: white; font - size: 2.5em; text-align: center'><br>Ususario ya existe</h6>");
                }
            });
        }else{
            //en caso de que los campos se encuentren vacios
            register.append("<h6 style='color: white; font - size: 2.5em; text-align: center'><br>No se permiten campos vacíos</h6>");
        }
    });
//////////////////////////////////////////// End Login & Registro

    tecnico.submit(function (e){
        e.preventDefault();
        window.location.href = "/tecnico.html";

    })


});