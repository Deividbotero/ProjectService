<?php
$host = "sql.freedb.tech";
$port = 3306;
$dbname = "freedb_ProfessionalService";
$username = "freedb_DavidBotero";
$password = "neREb@mYrFv9#8$";

// Crear conexión
$conn = new mysqli($host, $username, $password, $dbname, $port);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
echo "Conexión exitosa a la base de datos";
?>
