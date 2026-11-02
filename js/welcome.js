$(function () {
    const $form = $('#welcome-form');
    const $nameInput = $('#visitor-name');
    const $message = $('#welcome-message');
    const defaultText = $message.text();

    $form.on('submit', function (event) {
        event.preventDefault();

        const visitorName = $nameInput.val().trim();

        if (visitorName === '') {
            $message
                .text('Please type your name first, then press the button.')
                .removeClass('is-greeted')
                .addClass('is-error');
            $nameInput.trigger('focus');
            return;
        }

        $message
            .text('Welcome to Aurelius Cars, ' + visitorName + '! Start with the catalogue or book a test drive.')
            .removeClass('is-error')
            .addClass('is-greeted');
    });

    $nameInput.on('input', function () {
        if ($message.hasClass('is-error') && $nameInput.val().trim() !== '') {
            $message.text(defaultText).removeClass('is-error');
        }
    });
});
