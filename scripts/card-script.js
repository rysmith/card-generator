document.addEventListener("DOMContentLoaded", function() {
    addEnterSubmitListener();
    addSearchListener();
    card.getCardsFromStorage();
});

function addEnterSubmitListener() {
    document.getElementById('content').addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            card.generateCard();
        }
    });
}

function addSearchListener() {
    var search = document.getElementById('search')

    search.addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            if (this.value === '') {
                Array.from(document.getElementById('cards').children).forEach(card => card.remove());

                card.getCardsFromStorage();
            } else {
                var cards = JSON.parse(localStorage.getItem('card-storage'));
                Array.from(document.getElementById('cards').children).forEach(card => card.remove());

                cards
                    .filter(card => card.tags)
                    .filter(card => card.tags.includes(this.value))
                    .sort(card.sortCards)
                    .forEach(c => card.buildCardNodes(c.id, c.name, c.content, c.imageUrl, c.tags))
            }
        }

    });
}



function addPlaceholder() {
    var cardsNode = document.getElementById('cards');
    var placeholder = document.getElementById('placeholder');

    if (!placeholder) {
        var newPlaceholder = domUtility.buildNode('div', 'Cards go here.', [
            { key: 'id', value: 'placeholder' }
        ]);

        cardsNode.appendChild(newPlaceholder);
    }
}

function removePlaceholder() {
    var placeholder = document.getElementById('placeholder');
    if (placeholder) {
        placeholder.remove();
    }
}

function removeCardsFromStorage() {
    localStorage.removeItem('card-storage');
    var cards = document.getElementById('cards');

    Array.from(cards.getElementsByClassName('card')).forEach(card => card.remove());

    addPlaceholder();
}