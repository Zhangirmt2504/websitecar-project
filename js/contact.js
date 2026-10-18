const contactForm = document.getElementById('contact-form');
const messageInput = document.getElementById('contact-message');
const messageCount = document.getElementById('message-count');
const contactSuccess = document.getElementById('contact-success');

messageInput.addEventListener('input', function () {
    messageCount.textContent = messageInput.value.length;
});

contactForm.addEventListener('input', function () {
    contactSuccess.classList.add('d-none');
});

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    contactForm.classList.add('was-validated');

    if (contactForm.checkValidity()) {
        contactSuccess.classList.remove('d-none');
    } else {
        contactSuccess.classList.add('d-none');
    }
});
