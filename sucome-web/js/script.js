/* función de menu hamburguesa */
$(document).ready(() => {
    // $('#css_style').replaceWith('<link id="css_style" rel="stylesheet" href="/css/style.css?t=' + Date.now() + '"></link>');

    const menuHamburguer = document.querySelector('.nav_iconMenu');
    const menu = document.querySelector('.menu');

    const menuServicios = document.querySelector('.menu_Servicios');
    const serviciosOption = document.querySelector('.serviciosOption');

    menuHamburguer.addEventListener('click', () => {
        menu.classList.toggle('close_menu');
        menuHamburguer.classList.toggle('fa-times')
    });

    serviciosOption.addEventListener('click', () => {
        menuServicios.classList.toggle('menu_ServiciosClose')
    });
    /* funcion de slider */

    $(".right").click(function () {
        side_slide(1);
        console.log("derecha");
    });
    $(".left").click(function () {
        side_slide(-1);
        console.log("izquierda");
    });


    let showImg = (e) => {
        let i;
        const img = document.querySelectorAll('.image-slide');
        const sliders = document.querySelectorAll('.btn-slider');
        //4 valor maximo
        if (e > img.length) {
            indexValue = 1;
        }

        if (e < 1) {
            indexValue = img.length;
        }

        for (i = 0; i < img.length; i++) {
            img[i].style.display = "none"
        }

        if(img[indexValue - 1]){
            img[indexValue - 1].style.display = "block"
        }
    }

    let indexValue = 1;
    showImg(indexValue);

    let side_slide = (e) => {
        showImg(indexValue += e);
        console.log(indexValue); 
    }

    //Obtener los servicios disponibles
    obtenerServicios();
    function obtenerServicios() {

        urlPhp = "/php/servicios.php";
        urlServicio = "/html/servicios.html";

        $.ajax({
            method: "GET",
            url: urlPhp,
            cache: false,
            success: (respuesta) => {
                var info = JSON.parse(respuesta);
                var cont = info.totalServicios;
                var ul = document.getElementById("menu_servicios");
                for (i = 0; i < cont; i++) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    li.classList.add('servicio' + info['servicio' + i].idservicio);
                    a.href = urlServicio + '?idservicio=' + info['servicio' + i].idservicio;
                    a.innerText = info['servicio' + i].titulo;
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            },
            error: () => {
                console.log('error jajaja');
            }
        });
    }
});