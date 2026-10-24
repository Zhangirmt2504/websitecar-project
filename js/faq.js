const faqButtons = document.querySelectorAll('.faq-toggle');

faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const answer = document.getElementById(button.getAttribute('aria-controls'));
        const isOpen = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', String(!isOpen));
        answer.hidden = isOpen;
    });
});
