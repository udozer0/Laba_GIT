<?php
$USER = $_POST['USER'];

$file_path = '../data/data.json';
$data = file_get_contents($file_path);
$users = json_decode($data, true);


foreach ($users as &$user) {
    if ($user['username'] === $USER) {
        if (!empty($_FILES['fileupload']['tmp_name'])){
            $upload_path = '../pics/avatars/';
            $name = $_FILES['fileupload']['name'];

            $ext = pathinfo($name, PATHINFO_EXTENSION);

            $new_name=uniqid().'.'.$ext;
            $user['av']=$upload_path.$new_name;
            $tmp_name=$_FILES['fileupload']['tmp_name'];
            move_uploaded_file($tmp_name, $upload_path.$new_name);   
        }
        break;
    }
}

$new_data = json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents($file_path, $new_data);
header('Content-Type: application/json');
echo json_encode(array('success' => true));