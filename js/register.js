$(function () {
    const $form = $('#register-form');
    const $password = $('#password');
    const $confirm = $('#confirm-password');
    const $confirmFeedback = $('#confirm-feedback');
    const $success = $('#register-success');
    const defaultConfirmText = $confirmFeedback.text();

    function checkPasswords() {
        const confirmField = $confirm.get(0);

        if ($confirm.val() !== '' && $confirm.val() !== $password.val()) {
            confirmField.setCustomValidity('Passwords do not match');
            $confirmFeedback.text('Passwords do not match.');
        } else {
            confirmField.setCustomValidity('');
            $confirmFeedback.text(defaultConfirmText);
        }
    }

    $password.add($confirm).on('input', checkPasswords);

    $form.on('input', function () {
        $success.addClass('d-none');
    });

    $form.on('submit', function (event) {
        event.preventDefault();
        checkPasswords();
        $form.addClass('was-validated');
        $success.toggleClass('d-none', !this.checkValidity());
    });

    $form.on('reset', function () {
        $form.removeClass('was-validated');
        $confirm.get(0).setCustomValidity('');
        $confirmFeedback.text(defaultConfirmText);
        $success.addClass('d-none');
    });
});
