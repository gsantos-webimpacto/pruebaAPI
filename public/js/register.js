(function () {
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
        $('#i-fNacimiento').val($("select[name=ano]").val()+"-"+$("select[name=mes]").val()+"-"+$("select[name=dia]").val());
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
    // $(document).ready(function(){

    //     // cargamos los años
    //     for(var i=2000;i<2020;i++)
    //     {
    //         $("select[name=ano]").append(new Option(i,i));
    //     }

    //     // Evento que se ejecuta cuando se pulsa el boton del formulario
    //     $("input[name=boton]").click(function(){

    //         // Creamos un Date con el año y mes seleccionado del formulario
    //         // y con el dia 0, que nos devolvera el ultimo dia del mes
    //         // anterior.
    //         fecha=new Date($("select[name=ano]").val(), $("select[name=mes]").val(), 0);

    //         $("select[name=dia]").find('option').remove();
    //         for(var i=1;i<fecha.getDate();i++)
    //         {
    //             $("select[name=dia]").append(new Option(i,"dia "+i));
    //         }
    //         $("#resultado").html(fecha.toDateString());
    //     });
    // });
});
// var pais=document.getElementById('i-pais');
// pais.addEventListener("change",function(){
//     var idPais=pais.value;
//     var $provincias=$('.o-provincia');
//     if($provincias.length>0){
//         for (var i=0;i<$provincias.length;i++){
//             var result = $provincias[i];
//             result.remove();
//         }
//     }
//     $.ajax({
//        url:        '/findProvinciasByPais/'+idPais.toString(),
//        type:       'POST',
//        dataType:   'json',
//        async:      true,
//        success: function(data, status) {
//            var e = $('<option class="o-provincia" id="op-'+0+'" value='+data[0]['idprovincia']+' selected>'+data[0]['nombre']+'</option>');
//             $("#i-provincia").prepend(e);
//           for(i = 1; i < data.length; i++) {
//              student = data[i];
//              var e = $('<option class="o-provincia" id="op-'+i+'" value='+student['idprovincia']+'>'+student['nombre']+'</option>');
//              $("#i-provincia").prepend(e);
//           }
//        },
//        error : function(xhr, textStatus, errorThrown) {
//             console.log('Ajax failed.');
//        }
//     });
// });
