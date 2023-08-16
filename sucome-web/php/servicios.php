<?PHP
$conexion = mysqli_connect("localhost", "u455004439_gpo_sucome_usr", "49p;RFHRf>pN", "u455004439_gpo_sucome_bd");
if (!$conexion) {
    $servicios["error"] = mysqli_connect_error();
    echo json_encode($servicios);
    exit;
}

$informacion = mysqli_query($conexion, "SELECT idservicio, titulo FROM servicios WHERE estatus=1;");
$cont = 0;
while ($datos = mysqli_fetch_assoc($informacion)) {
    $servicios['servicio' . $cont] = $datos;
    $cont++;
}
$consultaNumeroServicios = mysqli_query($conexion, "SELECT COUNT(*) FROM servicios WHERE estatus=1;");
$numero = mysqli_fetch_row($consultaNumeroServicios);
$servicios["totalServicios"] = $numero;
echo json_encode($servicios);
mysqli_close($conexion);
?>