const submitBtn = document.getElementById("login-button");
const pwdInput = document.getElementById("password");
const errorDisplay = document.getElementById("error-message");

const params = new URLSearchParams(window.location.search) 
    if (params.get('error') === '1') {
        showError('Неверный пароль');
    }

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (pwdInput.value.trim() === '') {
        showError("Введите пароль");
    } else {
        clearError();
        e.target.closest('form').submit();
    }
});

function showError(message) {
    errorDisplay.textContent = message;
    pwdInput.classList.add('invalid');
}

function clearError() {
    errorDisplay.textContent = '';
    pwdInput.classList.remove('invalid');
}