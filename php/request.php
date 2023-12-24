<?php
$r1 = $_POST['r1'];
$r2 = $_POST['r2'];
$r3 = $_POST['r3'];
$r4 = $_POST['r4'];
$r5 = $_POST['r5'];
$USER = $_POST['USER'];

$errors = [];
if (empty($r1)) {
    $errors['r1'] = 'Поле "Пункт назначения" не заполнено';
} 

if (empty($r2)) {
    $errors['r2'] = 'Поле "Дата отъезда" не заполнено';
} elseif (!preg_match( '/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(202[3-9]|203[0-3])$/', $r2)) {
    $errors['r2'] = 'Дата введена неверно';
}

if (empty($r3)) {
    $errors['r3'] = 'Поле "Длительность поездки в днях" не заполнено';
} else {
    $regexp='/\D/';
    if (preg_match($regexp,$r3) or ($r3>90)) {
        $errors['r3'] = 'Длительность поездки указана неверно';
    }
}

if (empty($r4)) {
    $errors['r4'] = 'Поле "Название отеля" не заполнено';
} 

if ($r5 == '') {
  $errors['r5'] = 'Выберите ответ';
}

$file_path = '../data/data.json';
$data = file_get_contents($file_path);
$users = json_decode($data, true);
if (empty($errors)) {
    foreach ($users as &$user) {
        if ($user['username'] === $USER) {
            $k=0;
            $f=true;
            foreach ($user['requests'] as &$req) {
                $k += 1;
                if ($req['r1'] == $r1 && $req['r2'] == $r2 && $req['r3'] == $r3 
                        && $req['r4'] == $r4 && $req['r5'] == $r5) {
                    $errors['repeat'] = 
                            'Такая заявка уже существует под номером  ' . $k;
                    $f = false;
                    break;
                }
            }
            unset($req);
            if ($f) {
                $user['requests'][] = array(
                    'r1' => $r1,
                    'r2' => $r2,
                    'r3' => $r3,
                    'r4' => $r4,
                    'r5' => $r5
                );
            }
            break;
        }
    }
    unset($user);
}

if (!empty($errors)) {  
    header('Content-Type: application/json');
    echo json_encode($errors);
    exit;
}
$new_data = json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents($file_path, $new_data);
header('Content-Type: application/json');
echo json_encode(array('success' => true));