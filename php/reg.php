<?php
$file_path = '../data/data.json';
if (file_exists($file_path)) {
    $data = file_get_contents($file_path);
    if (empty($data)) {
        $users = array();
    } else {
        $users = json_decode($data, true);
    }
} else {
    $users = array();
}

$email = $_POST['reg_email'];
$age = $_POST['reg_age'];
$username = $_POST['reg_username'];
$psw = $_POST['reg_psw'];
$pswrep = $_POST['reg_pswrep'];

$errors = [];
if (empty($email)) {
    $errors['email'] = 'Поле "Почта" не заполнено';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Введен некорректный адрес эл. почты';
}

if (empty($age)) {
    $errors['age'] = 'Поле "Возраст" не заполнено';
} else {
    $regexp='/\D/';
    if (preg_match($regexp,$age) or $age>150) {
        $errors['age'] = 'Возраст указан неверно';
    }
}
  
if (empty($username)) {
    $errors['username'] = 'Поле "Логин" не заполнено';
} elseif (strlen($username)<4) {
    $errors['username'] = 'Логин должен быть более 3 символов';
} else {
    foreach ($users as $u) {
        if ($username === $u['username']) {
            $errors['username'] = 'Пользователь с таким логином уже существует';
            break;
        }
    }
}
  
if (empty($psw)) {
    $errors['psw'] = 'Поле "Пароль" не заполнено';
} else if(strlen($psw)<4) {
    $errors['psw'] = 'Пароль должен быть более 3 символов';
}
  
if (empty($pswrep)) {
    $errors['pswrep'] = 'Поле "Повторите пароль" не заполнено';
} else if ($pswrep !== $psw) {
    $errors['pswrep'] = 'Пароли не совпадают.';
}

if (!empty($errors)) {
    header('Content-Type: application/json');
    echo json_encode($errors);
    exit;
}

$user = array(
    'email' => $email,
    'age' => $age,
    'username' => $username,
    'psw' => $psw,
    'requests' => array(),
    'av' => ""
);
$users[] = $user;
$data = json_encode($users);
file_put_contents($file_path, $data);
header('Content-Type: application/json');
echo json_encode(array('success' => true));