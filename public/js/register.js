(function () {
    //funcion que muestra la password si hay algo en ese input
    function mostrarPassword() {
        var cambio = document.getElementById("txtPassword");
        if (cambio.type == "password") {
            cambio.type = "text";
            $("#img-password").attr("src", "../imagenes/ICONS/show.svg");
        } else {
            cambio.type = "password";
            $("#img-password").attr("src", "../imagenes/ICONS/hide.svg");
        }
    }
    //funcion que muestra la password si hay algo en ese input
    function mostrarPasswordRepetir() {
        var cambio = document.getElementById("txtRepetir");
        if (cambio.type == "password") {
            cambio.type = "text";
            $("#img-repetir").attr("src", "../imagenes/ICONS/show.svg");
        } else {
            cambio.type = "password";
            $("#img-repetir").attr("src", "../imagenes/ICONS/hide.svg");
        }
    }
    $("#img-password").click(function () {
        mostrarPassword();
    });
    $("#img-repetir").click(function () {
        mostrarPasswordRepetir();
    });
    $('#txtPassword').on("focusout",function(){
         validar();
    });
    $('#txtRepetir').on("focusout",function(){
        validar();
   });
    //funcion que comprueba si la contraseña cumple la expresion regular
    function validarPassword(s){
        var patron=/(?=.*\d{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{7,12}/g;
        return patron.test(s);
    }
    //comprueba que el formulario es valido, si no lo fuera no se envia
    function validar(){
        var valid =true;
        if(validarCamposPassword()==false)
            valid=false;    
        if( $('#check-confirmacion').is(":not(:checked)"))
            $('#error-confirmacion').text("Obligatorio");
        return valid;
    }
    //funcion que comprueba si hay contenido en los campos password y en ese caso que cumpla los requisitos de
    //password
    function validarCamposPassword(){
        var valid=true;
        console.log($('#txtPassword').val());
        console.log($('#txtRepetir').val());

        if(validarPassword($('#txtPassword').val())==false){
            valid=false;
            $('#txtPassword').attr("class","form-control btn-danger");
        }else
            $('#txtPassword').attr("class","form-control");
        if($('#txtRepetir').val() != $('#txtPassword').val()){
            valid=false;
            $('#txtRepetir').attr("class","form-control btn-danger");
        }else
            $('#txtRepetir').attr("class","form-control");
            // console.log(valid);
        return valid;
    }
    $('input[type="checkbox"]').click(function(){
        if($(this).is(":not(:checked)"))
            $('#error-confirmacion').text("Obligatorio");
        else
            $('#error-confirmacion').text("");
    });

    //funcion que inserta usuario medinate AJAX y API
    //Llamamos para que realice la insercion y comprobamos que la ha realizado   
    $('form').on("submit",function(e){
        $valid = false;
        if(validar()){
            var user={
                "password": $('#txtPassword').val(),
                "username": "",
                "roles": [
                    "ROLE_USER"
                ],
                "nombre": $('#i-nombre').val(),
                "apellidos": $('#i-apellidos').val(),
                "fechadenacimiento": $('#i-fNacimiento').val(),
                "sexo": $('input:radio[name=sexo]:checked').val(),
                "telefono": $('#i-telefono').val(),
                "datosadicionales": $('#datosAdicionales').val(),
                "ciudad": $('#i-ciudad').val(),
                "direccion": $('#i-direccion').val(),
                "codigopostal": Number($('#i-codigoPostal').val()),
                "idioma": "/api/idiomas/"+$('#i-idioma').val(),
                "pais": "/api/pais/"+$('#i-pais').val(),
                "provincia": "/api/provincias/"+$('#i-provincia').val(),
                "email": $('#i-email').val()
            };
            var request=$.ajax({
                url: "/api/users",
                type: "post",
                contentType:"application/json; charset=utf-8",
                data:JSON.stringify(user),
                async: false,
                success: function(response)
                {
                    // alert("realizado");
                    // console.log("Archivo enviado");
                    $valid= true;
                },
                error: function(response){
                    e.preventDefault();
                    //  console.log("Archivo NO enviado");
                    //  alert(response.status);
                    $valid= false;
                    $('#error-email').text("Email asociado a una cuenta ya existente");
                    // alert("Email asociado a una cuenta ya existente");
                },
            });
            request.then(function(){
                // alert('alw');
                return $valid;
            });
            //  alert($valid);
        }else{
            return false;
        }
    });

   //Apartado en el que se comprueba que solo se puede meter una actual, no permite futura
    var date = new Date();
    var year = date.getFullYear();
    $("#year").on("change", function () {
        $('.mes').remove();
        var option="<option value='' disabled selected>Mes</option>";
        $("select[name=mes]").append(option);
        $("select[name=dia]").find("option").remove();
        option="<option value='' disabled selected>Día</option>";
        $("select[name=dia]").append(option);
    });
    $("#year").on("focus", function () {
        for (var i = year; i >= 1930; i--) {
            $("select[name=ano]").append(new Option(i, i));
        }
    });
    $("#mes").on("change", function () {
        $("select[name=dia]").find("option").remove();
        var option="<option value='' disabled selected>Día</option>";
        $("select[name=dia]").append(option);
    });
    $("#mes").on("focus", function () {
        $("select[name=mes]").find("option").remove();
        var fecha = new Date($("select[name=ano]").val(), date.getMonth(), 0);
        var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",];
        if ((fecha <= date) & ($("select[name=ano]").val() != null)) {
            if (fecha.getFullYear() == date.getFullYear()) {
                for (var i = 0; i <= date.getMonth(); i++) {
                    var option="<option class='mes' value="+(i+1)+">"+meses[i]+"</option>";
                    $("select[name=mes]").append(option);
                }
            } else {
                for (var i = 0; i < meses.length; i++) {
                    var option="<option class='mes' value="+(i+1)+">"+meses[i]+"</option>";
                    $("select[name=mes]").append(option);
                }
            }
        }else{
            var option="<option value='' disabled selected>Mes</option>";
            $("select[name=mes]").append(option);
        }
    });
    $("#dia").on("focus", function () {
        var fecha = new Date(
            $("select[name=ano]").val(),
            $("select[name=mes]").val(),
            0
        );
        $("select[name=dia]").find("option").remove();
        if ((fecha <= date || (fecha.getFullYear() == date.getFullYear() & fecha.getMonth()==date.getMonth())) & ($("select[name=ano]").val() != null) & ($("select[name=mes]").val() != null)) {
            if(fecha.getFullYear() == date.getFullYear()){
                var day=date.getDate();
                if (fecha.getMonth()==date.getMonth()) {
                    for (var i = 1; i <= day; i++) {
                        $("select[name=dia]").append(new Option(i, i));
                    }
                } else {
                    for (var i = 1; i <= fecha.getDate(); i++) {
                        $("select[name=dia]").append(new Option(i, i));
                    }
                }
            }else {
                for (var i = 1; i <= fecha.getDate(); i++) {
                    $("select[name=dia]").append(new Option(i, i));
                }
            }
        }else{
            var option="<option value='' disabled selected>Día</option>";
            $("select[name=dia]").append(option);
        }
    });
    $("#dia").on("change", function (){
        $('#i-fNacimiento').val($("select[name=ano]").val() + "-" + $("select[name=mes]").val() + "-" + $("select[name=dia]").val());
        console.log(($("select[name=dia]").val()));

    });
})();

//Apartado de AJAX en que salen las provincias en funcion del pais seleccionado
var pais = document.getElementById("i-pais");
pais.addEventListener("change", function () {
    var idPais = pais.value;
    var $provincias = $(".o-provincia");
    if ($provincias.length > 0) {
        for (var i = 0; i < $provincias.length; i++) {
            var result = $provincias[i];
            result.remove();
        }
    }
    $.ajax({
        url: "/findProvinciasByPais/" + idPais.toString(),
        type: "POST",
        dataType: "json",
        async: true,
        success: function (data, status) {
            var e = $(
                '<option class="o-provincia" id="op-' +
                0 +
                '" value=/api/provincias/' +
                data[0]["idprovincia"] +
                " selected>" +
                data[0]["nombre"] +
                "</option>"
            );
            $("#i-provincia").prepend(e);
            for (i = 1; i < data.length; i++) {
                student = data[i];
                var e = $(
                    '<option class="o-provincia" id="op-' +
                    i +
                    '" value=/api/provincias/' +
                    student["idprovincia"] +
                    ">" +
                    student["nombre"] +
                    "</option>"
                );
                $("#i-provincia").prepend(e);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Ajax failed.");
        },
    });
});
    