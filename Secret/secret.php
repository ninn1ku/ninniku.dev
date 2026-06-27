<?php
session_start();

// Защита страницы: без авторизации — обратно на вход
if (!isset($_SESSION['secret_auth']) || $_SESSION['secret_auth'] !== true) {
    header('Location: login.html');
    exit;
}
?>
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Secret</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="secret.css" />
  </head>
  <body>
    <div class="glow glow--left" aria-hidden="true"></div>
    <div class="glow glow--right" aria-hidden="true"></div>

    <nav class="nav">
      <a href="../index.html" class="nav__back">← главная</a>
      <span class="nav__title">secret</span>
      <a href="logout.php" class="nav__logout">выйти</a>
    </nav>

    <main class="main">

      <header class="secret__header">
        <h1 class="secret__title">моё пространство</h1>
        <p class="secret__sub">только для меня</p>
      </header>

      <!-- Фотографии -->
      <section class="secret__section">
        <h2 class="secret__section-title">фотографии</h2>
        <div class="secret__photos">
          <div class="photo-placeholder">+ добавить фото</div>
        </div>
      </section>

      <!-- Воспоминания / тексты -->
      <section class="secret__section">
        <h2 class="secret__section-title">заметки</h2>
        <div class="secret__notes">
          <div class="note-card">
            <p class="note-card__date">сегодня</p>
            <p class="note-card__text">Здесь будут твои личные записи, воспоминания и мысли.</p>
          </div>
        </div>
      </section>

    </main>

    <footer class="footer">DESIGN BY <span>NINNIKU DESIGN</span></footer>
  </body>
</html>
