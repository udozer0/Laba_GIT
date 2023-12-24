<?php
$USER = $_POST['USER'];
$number = $_POST['number'];


$file_path = '../data/data.json';
$data = file_get_contents($file_path);
$users = json_decode($data, true);

foreach ($users as &$user) {
    if ($user['username'] === $USER) {
        array_splice($user['requests'],$number,1);
        break;
    }
}

$new_data = json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents($file_path, $new_data);
header('Content-Type: application/json');
echo json_encode(array('success' => true));