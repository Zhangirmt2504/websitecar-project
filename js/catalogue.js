$(function () {

    const $search = $('#car-search');
    const $filterButtons = $('#brand-filter .filter-button');
    const $cards = $('#car-list .car-card');
    const $resultCount = $('#result-count');
    const $noResults = $('#no-results');
    let activeBrand = 'all';

    function filterCars() {
        const query = $search.val().trim().toLowerCase();
        let visible = 0;

        $cards.each(function () {
            const $card = $(this);
            const text = ($card.find('h3').text() + ' ' + $card.data('type')).toLowerCase();
            const brandOk = activeBrand === 'all' || $card.data('brand') === activeBrand;
            const textOk = text.indexOf(query) !== -1;
            const match = brandOk && textOk;

            $card.toggle(match);

            if (match) {
                visible++;
            }
        });

        $resultCount.text('Showing ' + visible + ' of ' + $cards.length + ' cars');
        $noResults.prop('hidden', visible !== 0);
    }

    $search.on('input', filterCars);

    $('#brand-filter').on('click', '.filter-button', function () {
        const $button = $(this);

        activeBrand = $button.data('brand');
        $filterButtons.removeClass('is-active').attr('aria-pressed', 'false');
        $button.addClass('is-active').attr('aria-pressed', 'true');
        filterCars();
    });

    $('#reset-filters').on('click', function () {
        $search.val('');
        $filterButtons.filter('[data-brand="all"]').trigger('click');
        $search.trigger('focus');
    });


    const $toast = $('#shortlist-toast');

    function showToast(message) {
    
        $toast.stop(true).text(message).fadeTo(200, 1).delay(2500).fadeTo(600, 0);
    }



    const $shortlist = $('#shortlist');
    const $form = $('#shortlist-form');
    const $input = $('#shortlist-input');
    const $error = $('#shortlist-error');
    const $count = $('#shortlist-count');
    const $empty = $('#shortlist-empty');
    const storageKey = 'aurelius-shortlist';

    function getItems() {
        return $shortlist.find('.shortlist-text').map(function () {
            return $(this).text();
        }).get();
    }

    function findItem(text) {
        const wanted = text.toLowerCase();

        return $shortlist.children('li').filter(function () {
            return $(this).find('.shortlist-text').text().toLowerCase() === wanted;
        });
    }

    function saveItems() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(getItems()));
        } catch (error) {
            
        }
    }

    function loadItems() {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey));
            return Array.isArray(saved) ? saved : [];
        } catch (error) {
            return [];
        }
    }

    function addItem(text) {
        const $label = $('<span>', { 'class': 'shortlist-text' }).text(text);
        const $remove = $('<button>', {
            type: 'button',
            'class': 'remove-button',
            'aria-label': 'Remove ' + text + ' from the shortlist'
        }).text('Remove');

        $('<li>').append($label, $remove).appendTo($shortlist);
    }


    function updateShortlist() {
        const total = $shortlist.children('li').length;

        $count.text(total === 1 ? '1 item' : total + ' items');
        $empty.prop('hidden', total !== 0);

        $('.add-to-shortlist').each(function () {
            const $button = $(this);
            const added = findItem($button.data('car')).length > 0;

            $button
                .toggleClass('is-added', added)
                .text(added ? 'Remove from shortlist' : 'Add to shortlist');
        });

        saveItems();
    }

    function showError(message) {
        $error.text(message).prop('hidden', false);
        $input.addClass('is-invalid').attr('aria-invalid', 'true');
    }

    function hideError() {
        $error.text('').prop('hidden', true);
        $input.removeClass('is-invalid').attr('aria-invalid', 'false');
    }

    $form.on('submit', function (event) {
        event.preventDefault();

        const text = $input.val().trim();

        if (text === '') {
            showError('Please write a car or a question first.');
            $input.trigger('focus');
            return;
        }

        if (findItem(text).length > 0) {
            showError('"' + text + '" is already in your shortlist.');
            $input.trigger('focus');
            return;
        }

        hideError();
        addItem(text);
        updateShortlist();
        showToast('Added to your shortlist: ' + text);
        $input.val('').trigger('focus');
    });

    $input.on('input', function () {
        if ($input.val().trim() !== '') {
            hideError();
        }
    });

    // delegated handler: works for items that are added later
    $shortlist.on('click', '.remove-button', function () {
        const $item = $(this).closest('li');
        const text = $item.find('.shortlist-text').text();
        const $next = $item.next().length ? $item.next() : $item.prev();

        $item.remove();
        updateShortlist();
        showToast('Removed from your shortlist: ' + text);


        if ($next.length) {
            $next.find('.remove-button').trigger('focus');
        } else {
            $input.trigger('focus');
        }
    });


    $('#car-list').on('click', '.add-to-shortlist', function () {
        const car = $(this).data('car');
        const $existing = findItem(car);

        if ($existing.length > 0) {
            $existing.remove();
            showToast('Removed from your shortlist: ' + car);
        } else {
            addItem(car);
            showToast('Added to your shortlist: ' + car);
        }

        hideError();
        updateShortlist();
    });


    $.each(loadItems(), function (index, text) {
        if (typeof text === 'string' && text.trim() !== '' && findItem(text).length === 0) {
            addItem(text.trim().slice(0, 60));
        }
    });

    updateShortlist();
    filterCars();
});

