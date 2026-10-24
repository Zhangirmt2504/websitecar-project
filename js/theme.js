document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const htmlElement = document.documentElement; 

    if (!themeToggleBtn) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('theme-light');
        htmlElement.setAttribute('data-bs-theme', 'light'); 
        themeToggleBtn.textContent = 'Switch to dark theme';
    } else {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        themeToggleBtn.textContent = 'Switch to light theme';
    }

    themeToggleBtn.addEventListener('click', function () {
        body.classList.toggle('theme-light');
        const isLight = body.classList.contains('theme-light');

        if (isLight) {
            htmlElement.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = 'Switch to dark theme';
        } else {
            htmlElement.setAttribute('data-bs-theme', 'dark'); 
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = 'Switch to light theme';
        }
    });
});
