<?php
session_start();

$hash = '$2y$10$СЮДА_ВСТАВЬ_СВОЙ_ХЭШ';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';

    if (password_verify($password, $hash)) {
        $_SESSION['secret_auth'] = true;
        header('Location: secret.php');
        exit;
    } else {
        header('Location: login.html?error=1');
        exit;
    }
}

// GET-запрос без сессии — редирект на форму
if (!isset($_SESSION['secret_auth'])) {
    header('Location: login.html');
    exit;
}
?>
