(function () {
    //funcion que muestra la fecha de nacimiento del usuario en los select
    function mostrarFechaNacimiento(){
        var $date=new Date($('#i-fNacimiento').val());
        var option = "<option value='"+$date.getFullYear()+"' selected>"+$date.getFullYear()+"</option>";
        $("select[name=ano]").append(option);
        var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",];
        var option = "<option value='"+$date.getMonth()+"' selected>"+meses[$date.getMonth()]+"</option>";
        $("select[name=mes]").append(option);
        var option = "<option value='"+$date.getDate()+"' selected>"+$date.getDate()+"</option>";
        $("select[name=dia]").append(option);
    }
    mostrarFechaNacimiento();
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
    //funcion que comprueba si hay contenido en los campos password y en ese caso que cumpla los requisitos de
    //password
   function validarCamposPassword(){
       var valid=true;
            console.log($('#txtPassword').val());
            console.log($('#txtRepetir').val());
            if($('#txtPassword').val()!=""){
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
            }
            console.log(valid);
       return valid;
   }
   //comprueba que el formulario es valido, si no lo fuera no se envia
   function validar(){
       var valid =true;
       if(validarCamposPassword()==false)
           valid=false;    
       return valid;
   }    
   $('form').on("submit",function(){
       return validar();
   });
   //funcion que comprueba si la contraseña cumple la expresion regular
   function validarPassword(s){
       var patron=/(?=.*\d{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{7,12}/g;
       return patron.test(s);
   }
   //Apartado en el que se comprueba que solo se puede meter una actual, no permite futura
    var date = new Date();
    var year = date.getFullYear();
    $("#year").on("change", function () {
        $('.mes').remove();
        var option = "<option value='' disabled selected>Mes</option>";
        $("select[name=mes]").append(option);
        $("select[name=dia]").find("option").remove();
        option = "<option value='' disabled selected>Día</option>";
        $("select[name=dia]").append(option);
    });
    $("#year").on("focus", function () {
        for (var i = year; i >= 1930; i--) {
            $("select[name=ano]").append(new Option(i, i));
        }
    });
    $("#mes").on("change", function () {
        $("select[name=dia]").find("option").remove();
        var option = "<option value='' disabled selected>Día</option>";
        $("select[name=dia]").append(option);
    });
    $("#mes").on("focus", function () {
        $("select[name=mes]").find("option").remove();
        var fecha = new Date($("select[name=ano]").val(), date.getMonth(), 0);
        var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
        ];
        if ((fecha <= date) & ($("select[name=ano]").val() != null)) {
            if (fecha.getFullYear() == date.getFullYear()) {
                for (var i = 0; i <= date.getMonth(); i++) {
                    var option = "<option class='mes' value=" + (i + 1) + ">" + meses[i] + "</option>";
                    $("select[name=mes]").append(option);
                }
            } else {
                for (var i = 0; i < meses.length; i++) {
                    var option = "<option class='mes' value=" + (i + 1) + ">" + meses[i] + "</option>";
                    $("select[name=mes]").append(option);
                }
            }
        } else {
            var option = "<option value='' disabled selected>Mes</option>";
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
        if ((fecha <= date || (fecha.getFullYear() == date.getFullYear() & fecha.getMonth() == date.getMonth())) & ($("select[name=ano]").val() != null) & ($("select[name=mes]").val() != null)) {
            if (fecha.getFullYear() == date.getFullYear()) {
                var day = date.getDate();
                if (fecha.getMonth() == date.getMonth()) {
                    for (var i = 1; i <= day; i++) {
                        $("select[name=dia]").append(new Option(i, i));
                    }
                } else {
                    for (var i = 1; i <= fecha.getDate(); i++) {
                        $("select[name=dia]").append(new Option(i, i));
                    }
                }
            } else {
                for (var i = 1; i <= fecha.getDate(); i++) {
                    $("select[name=dia]").append(new Option(i, i));
                }
            }
        } else {
            var option = "<option value='' disabled selected>Día</option>";
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
                '" value=' +
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
                    '" value=' +
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