<?php

require_once 'db_config.php';

header('Content-Type: application/json');

header('Cache-Control: no-cache, must-revalidate'); // HTTP 1.1.
header('Pragma: no-cache'); // HTTP 1.0.
header('Expires: 0'); // Proxies.

$sql = "SELECT id, nombre FROM sedes";

$resultado = $conexion->query($sql);

if ($resultado) {
    $sedes = [];
    while ($fila = $resultado->fetch_assoc()) {
        $sedes[] = $fila;
    }
    echo json_encode($sedes);
} else {
    echo json_encode(['error' => 'Error al ejecutar la consulta: ' . $conexion->error]);
}

$conexion->close();

?>