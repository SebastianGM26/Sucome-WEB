$(document).ready(() => {
    const url_parametros = new URLSearchParams(window.location.search);
    const id_servicio = url_parametros.get('idservicio');
    CargarDatos(id_servicio);
    function CargarDatos(id_servicio) {
        $.ajax({
            method: "GET",
            url: "/php/datos_servicios.php?idservicio=" + id_servicio,
            cache: false,
            success: (respuesta) => {
                var info = JSON.parse(respuesta);
                if (info[0].estatus == 0) {

                    var div = document.createElement("div");
                    var alerta = document.createTextNode("ERROR 404");
                    var mensaje = document.createTextNode("La pagina a la que intentas acceder no se encuentra disponible.");
                    var BotonRegreso = document.createElement("button");
                    var titulo = document.createElement("div");
                    titulo.appendChild(alerta);
                    var descripcion = document.createElement("div");
                    descripcion.appendChild(mensaje);
                    BotonRegreso.textContent = "Ir a la Pagina de inicio";
                    BotonRegreso.addEventListener("click", () => {
                        window.location.href = "/"
                    });
                    div.appendChild(titulo);
                    div.appendChild(descripcion);
                    div.appendChild(BotonRegreso);
                    div.className = "Error404";
                    titulo.className = "tituloError404";
                    descripcion.className = "mensajeError404";
                    BotonRegreso.className = "irPaginaInicio";
                    document.getElementById("informacionServicios").parentNode.replaceChild(div, document.getElementById("informacionServicios"));
                }
                else {
                    let caracteristicas = info[0].caracteristicas.split('|');
                    let beneficios = info[0].beneficios.split('|');
                    
                    if(id_servicio != 3){
                        $("#titulo_servicio").html(info[0].titulo);
                        $('.main-servicios section').css("background-image", "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + info[0].imagen + ")");
                    }else{
                        $('.main-servicios section').css("background-image", "url(" + info[0].imagen + ")");
                    }

                    $("#descripcion_servicio").html(info[0].descripcion);

                    $.each(caracteristicas, function (index, value) {
                        $(".caracteristicas").append('<div class="img-carac"><i class="fas fa-caret-right"></i><p>' + value + '</p></div>');
                    });

                    $.each(beneficios, function (index, value) {
                        $(".beneficios").append('<div class="img-carac"><i class="fas fa-caret-right"></i><p>' + value + '</p></div>');
                    });
                    unset(caracteristicas, beneficios);

                }
            }
        });
    }
});