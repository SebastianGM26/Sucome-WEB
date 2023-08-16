<?php
$conn = mysqli_connect("localhost", "u455004439_gpo_sucome_usr", "49p;RFHRf>pN", "u455004439_gpo_sucome_bd");

if (!$conn) {
    $servicios["error"] = mysqli_connect_error();
    echo json_encode($servicios);
    exit;
}
$nombre = $_POST["nombre"];
$empresa = $_POST["empresa"];
$puesto = $_POST["puesto"];
$whatsapp = $_POST["whatsapp"];
$correo = $_POST["correo"];
$tipo_obra = $_POST["tipo_obra"];
$zona_geografica = $_POST["zona_geografica"];
$metros = $_POST["metros"];
$mensaje = $_POST["mensaje"];


$respuesta_ajax = [];
$sql = "INSERT INTO cotizacion (nombre_contacto, empresa, puesto, whatsapp, correo, tipo_obra, zona_geografica, metros_cuadrados, mensaje) VALUES 
('" . addslashes($nombre) . "', '" . addslashes($empresa) . "', '" . addslashes($puesto) . "', '" . addslashes($whatsapp) . "', '" . addslashes($correo) . "', '" . addslashes($tipo_obra) . "', '" . addslashes($zona_geografica) . "', '" . addslashes($metros) . "', '" . addslashes($mensaje) . "');";

mysqli_query($conn, $sql);
if (mysqli_affected_rows($conn) == 1) {
    $respuesta_ajax["code"] = 1;
    $respuesta_ajax["message"] = "<h4>Formulario enviado correctamente.</h4>";
} else {
    $respuesta_ajax["code"] = 0;
    $respuesta_ajax["message"] = "<h4>Error. No se pudo mandar tu información. Favor de intentarlo nuevamente.</h4>";
}
echo json_encode($respuesta_ajax);
mysqli_close($conn);
