<?php

require_once 'db_config.php';

// 2. Preparamos el encabezado de la respuesta para que el navegador sepa que es JSON
header('Content-Type: application/json');

header('Cache-Control: no-cache, must-revalidate'); // HTTP 1.1.
header('Pragma: no-cache'); // HTTP 1.0.
header('Expires: 0'); // Proxies.

// 3. Preparamos la consulta SQL par    a seleccionar todos los productos
$sql = "SELECT id, nombre, precio, categoria, descripcion, imagen, stock FROM productos";

// 4. Ejecutamos la consulta
$resultado = $conexion->query($sql);

// 5. Verificamos si la consulta fue exitosa
if ($resultado) {
    // Creamos un array vacío para guardar los productos
    $productos = [];
    
    // Recorremos cada fila del resultado y la añadimos a nuestro array
    // fetch_assoc() convierte cada fila en un array asociativo (clave-valor)
    // get_productos.php
while ($fila = $resultado->fetch_assoc()) {
    // Convertimos los campos numéricos al tipo correcto
    $fila['id'] = (int)$fila['id'];
    $fila['precio'] = (float)$fila['precio'];
    $fila['stock'] = (int)$fila['stock'];
    
    $productos[] = $fila;
}
    
    // 6. Convertimos el array de productos a formato JSON y lo imprimimos
    // json_encode() es la función clave aquí.
    echo json_encode($productos);

} else {
    // Si hubo un error en la consulta, devolvemos un mensaje de error en JSON
    echo json_encode(['error' => 'Error al ejecutar la consulta: ' . $conexion->error]);
}

// 7. Cerramos la conexión a la base de datos para liberar recursos
$conexion->close();

?>