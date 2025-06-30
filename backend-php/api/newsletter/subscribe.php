<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Validate email
if(empty($data->email) || !filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(array("error" => "Geçerli bir email adresi giriniz"));
    exit();
}

try {
    // Check if email already exists
    $check_query = "SELECT id FROM newsletter_subscribers WHERE email = :email LIMIT 1";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(":email", $data->email);
    $check_stmt->execute();

    if($check_stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(array("error" => "Bu email adresi zaten kayıtlı"));
        exit();
    }

    // Insert new subscriber
    $query = "INSERT INTO newsletter_subscribers (email, subscribed_at, is_active) VALUES (:email, NOW(), 1)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $data->email);

    if($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array(
            "message" => "Newsletter kaydınız başarıyla alındı!",
            "email" => $data->email
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("error" => "Kayıt oluşturulamadı"));
    }

} catch(Exception $e) {
    http_response_code(503);
    echo json_encode(array("error" => "Bir hata oluştu, lütfen tekrar deneyin"));
}
?> 