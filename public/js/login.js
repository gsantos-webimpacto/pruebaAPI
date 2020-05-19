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
    $('#img-password').click(function () {
        mostrarPassword();
        $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
})();