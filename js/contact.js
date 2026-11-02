
$(function () {
    const $form = $('#test-drive-form');
    const $success = $('#form-success');
    const $successText = $('#form-success-text');
    const $message = $('#td-message');
    const $messageCount = $('#message-count');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    const phonePattern = /^\+?[0-9\s()-]{10,18}$/;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.getFullYear() + '-' +
        String(tomorrow.getMonth() + 1).padStart(2, '0') + '-' +
        String(tomorrow.getDate()).padStart(2, '0');
    $('#td-date').attr('min', minDate);

    const carFromLink = new URLSearchParams(window.location.search).get('car');
    if (carFromLink) {
        const $option = $('#td-car option').filter(function () {
            return this.value === carFromLink;
        });
        if ($option.length) {
            $('#td-car').val(carFromLink);
        }
    }

    const rules = {
        'td-name': function (value) {
            if (value === '') return 'Please enter your name.';
            if (value.length < 2) return 'The name must have at least 2 letters.';
            return '';
        },
        'td-email': function (value) {
            if (value === '') return 'Please enter your email.';
            if (!emailPattern.test(value)) {
                return 'Check the email, it should look like name@example.com.';
            }
            return '';
        },
        'td-phone': function (value) {
            if (value !== '' && !phonePattern.test(value)) {
                return 'Use only digits, spaces and +, for example +7 701 234 5678.';
            }
            return '';
        },
        'td-car': function (value) {
            if (value === '') return 'Please choose a car for the test drive.';
            return '';
        },
        'td-date': function (value) {
            if (value === '') return 'Please choose a day.';
            if (value < minDate) return 'The earliest day for a test drive is tomorrow.';
            if (new Date(value + 'T12:00').getDay() === 0) {
                return 'The showroom is closed on Sunday, please choose another day.';
            }
            return '';
        }
    };

    function checkField($field) {
        const id = $field.attr('id');
        const error = rules[id]($field.val().trim());

        $('#' + id + '-error').text(error);
        $field
            .toggleClass('is-invalid', error !== '')
            .attr('aria-invalid', String(error !== ''));

        return error === '';
    }

    function formatDay(value) {
        return new Date(value + 'T12:00').toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    }

    $form.on('submit', function (event) {
        event.preventDefault();

        let $firstInvalid = null;

        $form.find('[data-validate]').each(function () {
            const $field = $(this);
            if (!checkField($field) && $firstInvalid === null) {
                $firstInvalid = $field;
            }
        });

        if ($firstInvalid !== null) {
            $success.stop(true, true).prop('hidden', true);
            $firstInvalid.trigger('focus');
            return;
        }

        const name = $('#td-name').val().trim();
        const car = $('#td-car option:selected').text();
        const day = formatDay($('#td-date').val());

        $successText.text('Thank you, ' + name + '. A test drive of the ' + car +
            ' on ' + day + ' would be possible.');
        $success.stop(true, true).prop('hidden', false).hide().fadeIn(300, function () {
            $success.trigger('focus');
        });

        this.reset();
        $form.find('.is-invalid').removeClass('is-invalid');
        $form.find('[aria-invalid]').attr('aria-invalid', 'false');
        $messageCount.text('0');
    });

    $form.on('input change', '[data-validate]', function () {
        const $field = $(this);
        if ($field.hasClass('is-invalid')) {
            checkField($field);
        }
    });

    $message.on('input', function () {
        $messageCount.text($message.val().length);
    });
});
