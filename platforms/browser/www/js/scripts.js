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
    let user2 = { nombre: userReg.val(), pass: passReg.val() };

    //session
    let usrId ="";
    let getID = function(){
        $.ajax(settingsGET).done(function (response) {
            // this is pretty hardcore lmao; 
            //se trunca la tabal del json en id, porque este no se necesita
            response.forEach(element => {
                if ((element["nombre"] === userLogin.val()) && (element["pass"] === passLogin.val())) {
                    usrId = element["id"];
                }
            });
        })

    }

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
        "url": "http://localhost:8000/cliente/getAll",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
        },
        "processData": true,
        "data": ""
    }


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
                                console.log('Data: ' + data);
                                register.fadeOut();
                                nav.fadeIn();
                                nav.append("<h6 style='color: black; font - size: 2.5em; text-align: center'><br>Registro exitoso!</h6>");
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
        /*
        <div class="row"> // por si quiere el correo lmao
            <div class="col">
                <form id="loginForm">
                    <div class="form-group"></div>
                    <label>
                        <h2 style="color:white; font-size:1.5em">Correo Electrónico</h2>
                    </label>
                    <input class="form-control transparent-input" placeholder="Correo" type="text"
                        id="mail"></input><br>
                </form>
            </div>
        </div>
        */
    });

    query.submit(function(e){//yay
        e.preventDefault();
        if ((title.val() !== "") && (descrip.val() !== "")) {
            getID();        
            let date = new Date();
            $.ajax({
                type: "POST",
                url: "http://localhost:8000/consulta/consulta",// api url
                data: JSON.stringify({ titulo: title.val(), descripcion: descrip.val(), 
                    fecha_hora: date.toDateString(), usuarioId: usrId,}),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) { 
                    console.log(JSON.stringify({ titulo: title.val(), descripcion: descrip.val(), 
                        fecha_hora: date.toDateString(), usuarioId: usrId, })); },
                    failure: function (errMsg) { console.log("lmao") }
            });
            nav.append("<h6 style='color: black; font - size: 2.5em; text-align: center'><br>Cosulta Realizada</h6>");
            query.fadeOut();
        } 
    });

    nav.submit(function(e){

        e.preventDefault();        
        if(qCreate){
            query.fadeIn();
        }
        if(home){
            $("#form").fadeOut();
        }
    });


    query.hide();
    register.hide();
    nav.hide();
    chat.hide();

});