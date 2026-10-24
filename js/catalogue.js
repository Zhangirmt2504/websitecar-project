const searchInput = document.getElementById('car-search');
const carCards = document.querySelectorAll('#catalogue .car-card');
const resultCount = document.getElementById('result-count');
const noResults = document.getElementById('no-results');

function filterCars() {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;

    carCards.forEach(function (card) {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const match = title.includes(query);

        card.hidden = !match;

        if (match) {
            visible = visible + 1;
        }
    });

    resultCount.textContent = 'Showing ' + visible + ' of ' + carCards.length + ' cars.';
    noResults.hidden = visible !== 0;
}

searchInput.addEventListener('input', filterCars);

const shortlistForm = document.getElementById('shortlist-form');
const shortlistInput = document.getElementById('shortlist-input');
const shortlist = document.getElementById('shortlist');
const shortlistCount = document.getElementById('shortlist-count');
const shortlistError = document.getElementById('shortlist-error');

function updateShortlistCount() {
    const total = shortlist.children.length;

    if (total === 0) {
        shortlistCount.textContent = 'Your shortlist is empty.';
    } else if (total === 1) {
        shortlistCount.textContent = '1 item in your shortlist.';
    } else {
        shortlistCount.textContent = total + ' items in your shortlist.';
    }
}

function addItem(text) {
    const item = document.createElement('li');
    const label = document.createElement('span');
    const removeButton = document.createElement('button');

    label.textContent = text;

    removeButton.type = 'button';
    removeButton.className = 'button button-outline remove-button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
        item.remove();
        updateShortlistCount();
    });

    item.append(label);
    item.append(removeButton);
    shortlist.append(item);
}

shortlistForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const text = shortlistInput.value.trim();

    if (text === '') {
        shortlistError.hidden = false;
        return;
    }

    shortlistError.hidden = true;
    addItem(text);
    shortlistInput.value = '';
    shortlistInput.focus();
    updateShortlistCount();
});

filterCars();
updateShortlistCount();
