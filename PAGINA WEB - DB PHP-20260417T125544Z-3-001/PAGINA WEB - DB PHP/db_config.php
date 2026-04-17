<?php

define('DB_HOST', 'localhost');      
define('DB_USER', 'root');          
define('DB_PASSWORD', '');           
define('DB_NAME', 'tienda_ecomarket');   

// Creamos la conexión usando MySQLi (una forma moderna y segura de conectar PHP con MySQL)
$conexion = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Establecemos el juego de caracteres a UTF-8 para soportar tildes y caracteres especiales
$conexion->set_charset("utf8mb4");

// Verificamos si hubo un error en la conexión
if ($conexion->connect_error) {
    // Si hay un error, el script se detiene y muestra el mensaje de error.
    // 'die()' es una función que detiene la ejecución del script.
    die("Error de Conexión: " . $conexion->connect_error);
}

?>