const nameInput = document.getElementById('visitor-name');
const welcomeButton = document.getElementById('welcome-button');
const welcomeMessage = document.querySelector('#welcome-message');

welcomeButton.addEventListener('click', function () {
    const visitorName = nameInput.value.trim();

    if (visitorName === '') {
        welcomeMessage.textContent = 'Please type your name first, then press the button.';
    } else {
        welcomeMessage.textContent = 'Welcome to Aurelius Cars, ' + visitorName + '! Have a look at our catalogue.';
    }
});
