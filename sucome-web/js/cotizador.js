$(document).ready(() => {
    //Validacion personalizada para verificar el numero de digitos ingresado.
    $.validator.addMethod("cifras", function (value, element, parametro) {
        if (value.length < parametro || value.length > parametro)
            return false;
        return true;
    }, "El Campo debe contar con {0} digitos");
    //validaciones a implementar
    $('form#form_cotizacion').validate({
        rules: {
            nombre: {
                required: true
            },
            empresa: {
                required: true
            },
            puesto: {
                required: true
            },
            whatsapp: {
                required: true,
                cifras: 10
            },
            correo: {
                required: true,
                email: true
            },
            tipo_obra: {
                required: true,
            },
            zona_geografica: {
                required: true
            },
            metros: {
                required: true,
                min: 0,
                max: 99999
            },
            mensaje: {
                required: true
            }
        },
        messages: {
            metros:{
                min: "No se aceptan numeros negativos"
            },
            tipo_obra: {
                required: "Seleccione una opcion valida"
            },
            zona_geografica: {
                required: "Seleccione una opcion valida"
            }
        }
    });

    $('form#form_cotizacion').submit((event) => {
        if ($('form#form_cotizacion').valid() == false)
            return false;
        $('.errors').hide();
        form_cotizacion = $('form#form_cotizacion');
        event.preventDefault();
        $.ajax({
            method: "POST",
            url: "../php/cotizador.php",
            data: $('form#form_cotizacion').serialize(),
            cache: false,
            success: (respuesta_ajax) => {
                let json = JSON.parse(respuesta_ajax);
                let icono;
                json.code == 1 ? icono = "success" : icono = "error";
                Swal.fire({
                    title: "GRUPO SUCOME",
                    html: json.message,
                    icon: icono,
                    confirmButtonText: "OK",
                    didDestroy: () => {
                        if (json.code == 1) form_cotizacion[0].reset();
                    }
                });
            }
        });
    });
});
