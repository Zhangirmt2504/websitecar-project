
$(function () {
    const $buttons = $('.faq-toggle');

    $('.faq-answer').hide().prop('hidden', false);

    $buttons.on('click', function () {
        const $button = $(this);
        const $answer = $('#' + $button.attr('aria-controls'));
        const isOpen = $button.attr('aria-expanded') === 'true';

        $button.attr('aria-expanded', String(!isOpen));
        $button.closest('.faq-item').toggleClass('is-open', !isOpen);

        if (isOpen) {
            $answer.stop(true).slideUp(200);
        } else {
            $answer.stop(true).slideDown(250);
        }
    });
});
