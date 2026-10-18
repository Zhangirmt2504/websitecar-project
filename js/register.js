const registerForm = document.getElementById('register-form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const confirmFeedback = document.getElementById('confirm-feedback');
const registerSuccess = document.getElementById('register-success');
const defaultConfirmText = 'Please repeat your password (at least 8 characters).';

function checkPasswords() {
    if (confirmPassword.value !== '' && confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
        confirmFeedback.textContent = 'Passwords do not match.';
    } else {
        confirmPassword.setCustomValidity('');
        confirmFeedback.textContent = defaultConfirmText;
    }
}

password.addEventListener('input', checkPasswords);
confirmPassword.addEventListener('input', checkPasswords);

registerForm.addEventListener('input', function () {
    registerSuccess.classList.add('d-none');
});

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    checkPasswords();
    registerForm.classList.add('was-validated');

    if (registerForm.checkValidity()) {
        registerSuccess.classList.remove('d-none');
    } else {
        registerSuccess.classList.add('d-none');
    }
});

registerForm.addEventListener('reset', function () {
    registerForm.classList.remove('was-validated');
    confirmPassword.setCustomValidity('');
    confirmFeedback.textContent = defaultConfirmText;
    registerSuccess.classList.add('d-none');
});
