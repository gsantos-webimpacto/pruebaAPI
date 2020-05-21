(function () {
    function mostrarFechaNacimiento(){
        var $date=new Date($('#i-fNacimiento').val());
        // $('').remove();
        var option = "<option value='"+$date.getFullYear()+"' selected>"+$date.getFullYear()+"</option>";
        $("select[name=ano]").append(option);
        var meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        var option = "<option value='"+$date.getMonth()+"' selected>"+meses[$date.getMonth()]+"</option>";
        $("select[name=mes]").append(option);
        // $("select[name=dia]").find("option").remove();
        var option = "<option value='"+$date.getDate()+"' selected>"+$date.getDate()+"</option>";
        $("select[name=dia]").append(option);
    }
    mostrarFechaNacimiento();
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
    // $('#txtRepetir').on("focus",function(){
    //     if(validar($('#txtRepetir').text==false)){
    //         $('#txtRepetir').setCustomValidity("La contraseña debe tener al menos 2 números, 1 mayúscula, 1 minúscula,  símbolo y 7 carácteres.");
    //     }else if($('#txtRepetir').text==$('#txtPassword').text){
    //         $('#txtRepetir').setCustomValidity("Las contraseña tiene que ser la misma");
    //     }
    // });
    // function validar(string){
    //     var patron=/(?=.*\d{2,})(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*[_@#$]{1,}).{7,12}/g;
    //     return string.match(patron);
    // }
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
        var meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
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