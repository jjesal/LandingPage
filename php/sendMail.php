<?php 
require_once('toolsHttp.php');
$data=obtenerDataPost();

$destinatario1 = "info@smartenglish4u.com"; 
$destinatario2 = "info@smartknowledgesolution.com"; 
$destinatario3 = "info@eduktvirtual.com"; 
$destinatario4 = "jjesal.000@gmail.com"; 
$asunto ="Correo desde la Landing Page de EduktMaestro";
$cuerpo ="
            Nombre: $data[nombre]
            Apellidos: $data[apellidos]
            Correo: $data[correo]
            País: $data[pais]
            Ciudad: $data[ciudad]
            Número: $data[numero]
            Mensaje: $data[mensaje]";
//para el envío en formato HTML 
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

//dirección del remitente 
$headers .= "From: Web MDS <contacto@eduktmaestro.lp>\r\n"; 

mail($destinatario1,$asunto,$cuerpo,$headers);
mail($destinatario2,$asunto,$cuerpo,$headers); 
mail($destinatario3,$asunto,$cuerpo,$headers);
mail($destinatario4,$asunto,$cuerpo,$headers);
?>
