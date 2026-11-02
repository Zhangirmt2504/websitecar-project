$(function () {
    const $html = $('html');
    const $body = $('body');
    const $themeButton = $('#theme-toggle');
    const $menuButton = $('#menu-toggle');
    const $nav = $('#main-nav');

    $html.addClass('js');


    function readSavedTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (error) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
        }
    }

    function applyTheme(isLight) {
        $body.toggleClass('theme-light', isLight);
        $html.attr('data-bs-theme', isLight ? 'light' : 'dark');
        $themeButton.text(isLight ? 'Switch to dark' : 'Switch to light');
    }

    applyTheme(readSavedTheme() === 'light');

    $themeButton.on('click', function () {
        const isLight = !$body.hasClass('theme-light');
        applyTheme(isLight);
        saveTheme(isLight ? 'light' : 'dark');
    });


    function closeMenu() {
        $menuButton.attr('aria-expanded', 'false');
        $nav.stop(true).slideUp(200);
    }

    $menuButton.on('click', function () {
        const isOpen = $menuButton.attr('aria-expanded') === 'true';

        if (isOpen) {
            closeMenu();
        } else {
            $menuButton.attr('aria-expanded', 'true');
            $nav.stop(true).slideDown(200);
        }
    });

    $nav.on('keydown', function (event) {
        if (event.key === 'Escape' && $menuButton.attr('aria-expanded') === 'true') {
            closeMenu();
            $menuButton.trigger('focus');
        }
    });
});
