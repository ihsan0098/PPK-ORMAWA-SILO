<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = 'ppkormawasilo@gmail.com';
    $subject = $_POST['subject'];
    $message = "Name: " . $_POST['name'] . "\nEmail: " . $_POST['email'] . "\n\nMessage:\n" . $_POST['message'];
    $headers = "From: " . $_POST['email'];

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(array("status" => "success"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Failed to send email"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request"));
}
?>
