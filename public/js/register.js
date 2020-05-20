(function () {
    function mostrarPassword() {
        var cambio = document.getElementById("txtPassword");
        if (cambio.type == "password") {
            cambio.type = "text";
            $('#img-password').attr("src","../imagenes/ICONS/show.svg");
        } else {
            cambio.type = "password";
            $('#img-password').attr("src","../imagenes/ICONS/hide.svg");
        }
    }
    function mostrarPasswordRepetir() {
        var cambio = document.getElementById("txtRepetir");
        if (cambio.type == "password") {
            cambio.type = "text";
            $('#img-repetir').attr("src","../imagenes/ICONS/show.svg");
        } else {
            cambio.type = "password";
            $('#img-repetir').attr("src","../imagenes/ICONS/hide.svg");
        }
    }
    $('#img-password').click(function () {
        mostrarPassword();
        // $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
    $('#img-repetir').click(function () {
        mostrarPasswordRepetir();
        // $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
    
})();

var pais=document.getElementById('i-pais');
pais.addEventListener("change",function(){
    var idPais=pais.value;
    var $provincias=$('.o-provincia');
    if($provincias.length>0){
        for (var i=0;i<$provincias.length;i++){
            var result = $provincias[i];
            result.remove();
        }
    }         
    $.ajax({  
    url:        '/findProvinciasByPais/'+idPais.toString(),  
    type:       'POST',   
    dataType:   'json', 
    async:      true,  
    success: function(data, status) { 
        var e = $('<option class="o-provincia" id="op-'+0+'" value='+data[0]['idprovincia']+' selected>'+data[0]['nombre']+'</option>');
            $("#i-provincia").prepend(e);
        for(i = 1; i < data.length; i++) {  
            student = data[i];  
            var e = $('<option class="o-provincia" id="op-'+i+'" value='+student['idprovincia']+'>'+student['nombre']+'</option>');
            $("#i-provincia").prepend(e);
        }  
    },  
    error : function(xhr, textStatus, errorThrown) {  
            console.log('Ajax failed.');
    }  
    });  
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