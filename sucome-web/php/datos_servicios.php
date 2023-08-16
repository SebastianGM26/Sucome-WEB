<?php
    try{
        $conexion = mysqli_connect("localhost", "u455004439_gpo_sucome_usr", "49p;RFHRf>pN", "u455004439_gpo_sucome_bd");
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $id_servicio = $_GET["idservicio"];
        $consultaNumeroServicios = mysqli_query($conexion,"SELECT COUNT(*) FROM servicios");
        $numero = mysqli_fetch_row($consultaNumeroServicios);
        if($id_servicio<0 || $id_servicio>implode("",$numero)){
            $servicio_no_disponible[0]['estatus']=0;
            echo json_encode($servicio_no_disponible);
            mysqli_close($conexion);
        }
        else{
            $informacion =  mysqli_query($conexion,"SELECT titulo, imagen, descripcion, caracteristicas, beneficios, estatus FROM servicios WHERE idservicio = ".$id_servicio);
            while($datos = mysqli_fetch_assoc($informacion)){
                $servicios[]=$datos;
            } 
            echo json_encode($servicios);
            mysqli_close($conexion);
        }
        
    }
    }catch (PDOException $exception) {
        $servicios["error"] = $exception->getMessage();
        echo json_encode($servicios);
        exit;
    }
    
?>