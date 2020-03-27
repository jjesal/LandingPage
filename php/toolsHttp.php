<?php
class toolsHttp
{
    static public function obtnerUrl()
    {
        $url=null;
        if (isset($_GET['url'])) {
            $url = $_GET['url'];
        }
        return $url;
    }
    static public function obtenerDataPost()
    {
        $parametrosPost = null;
        $parametrosPost = json_decode(file_get_contents("php://input"), true);
        if (json_last_error() != 0) { //hubo error al decodificar el json
            self::responder(400);
        }
        return $parametrosPost;
    }
    static public function responder($codigoHttp, $data = null)
    {
        // $respuesta = ["status" => "$codigoHttp", "data" => $data];
        http_response_code($codigoHttp);
        if (is_array($data)) {
            echo json_encode($data);
        }else{
            if ($data!=null) {
                echo ($data);
            }
        }
        
    }
}
