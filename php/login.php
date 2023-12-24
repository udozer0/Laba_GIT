<?php
$file_path = '../data/data.json';
$data = file_get_contents($file_path);
$users = json_decode($data, true);

$username = $_POST['username'];
$psw = $_POST['psw'];
$errors = [];
$f = false;
$pswcheck='';

if (empty($username)) {
    $errors['username'] = 'Введите имя пользователя';
} else {
    foreach ($users as $user) {
        if ($username === $user['username']) {
            $f=true;
            $pswcheck=$user['psw'];
            break;
        }
    }
    if ($f===false) {
        $errors['username'] = 'Пользователя с таким логином не существует';
    }
}

if (empty($psw)) {
    $errors['psw'] = 'Введите пароль'; 
} elseif ($f and ($pswcheck !== $psw)) {
    $errors['psw'] = 'Неверный пароль';
}

if (!empty($errors)) {
    header('Content-Type: application/json');
    echo json_encode($errors);
} else {
    header('Content-Type: application/json');
    echo json_encode(array('success' => true));
}