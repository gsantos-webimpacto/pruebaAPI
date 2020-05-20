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
    $("#year").on("focus", function () {
        for (var i = year; i >= 1930; i--) {
            $("select[name=ano]").append(new Option(i, i));
        }
    });
    $("#mes").on("focus", function () {
        $("select[name=mes]").find("option").remove();
        fecha = new Date($("select[name=ano]").val(), date.getMonth(), 0);
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
            // console.log(fecha.getFullYear());
            // console.log(date.getFullYear());
            if (fecha.getFullYear() == date.getFullYear()) {
                for (var i = 0; i <= date.getMonth(); i++) {
                    // console.log(meses[i]);
                    $("select[name=mes]").append(new Option(meses[i], i + 1));
                }
            } else {
                for (var i = 0; i < meses.length; i++) {
                    // console.log(meses[i]);
                    $("select[name=mes]").append(new Option(meses[i], i + 1));
                }
            }
        }
    });
    $("#dia").on("focus", function () {
        // console.log( $("select[name=mes]").val());
        fecha = new Date(
            $("select[name=ano]").val(),
            $("select[name=mes]").val(),
            0
        );
        // console.log(fecha.getMonth());
        // console.log('mes de fecha'+fecha.getMonth());
        //         console.log('mes de date'+date.getMonth());
        $("select[name=dia]").find("option").remove();
        // console.log(fecha.getMonth());
        // console.log(date.getMonth());
        if ((fecha <= date) &($("select[name=ano]").val() != null) &($("select[name=mes]").val() != null)) {
            if(fecha.getFullYear() === date.getFullYear()){
                console.log('mes de fecha'+fecha.getMonth());
                console.log('mes de date'+date.getMonth());
                var day=date.getDate();
                if (fecha.getMonth() == date.getMonth()) {
                    console.log("------------ entra mes igual");
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
        }
    });

    // console.log(fecha.getFullYear());
    // console.log(date.getFullYear());
    // if(fecha.getFullYear()==date.getFullYear()){
    //     for (var i = 0; i <= date.getMonth(); i++) {
    //         console.log(meses[i]);
    //         $("select[name=mes]").append(new Option(meses[i],i+1));
    //     }
    // }else{
    //     for (var i = 0; i < meses.length; i++) {
    //         console.log(meses[i]);
    //     $("select[name=mes]").append(new Option(meses[i],i+1));
    //     }
    // }

    // for (var i = 1; i <= fecha.getDate(); i++) {
    //   $("select[name=dia]").append(new Option(i, i));
    // }
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
