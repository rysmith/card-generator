document.addEventListener("DOMContentLoaded", function() {
    addEnterSubmitListener();
    addSearchListener();
    cardStorage.getCardsFromStorage();
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

                cardStorage.getCardsFromStorage();
            } else {
                var cards = JSON.parse(localStorage.getItem('card-storage'));
                Array.from(document.getElementById('cards').children).forEach(card => card.remove());

                cards
                    .filter(card => card.tags)
                    .filter(card => card.tags.includes(this.value))
                    .sort(card.sortByTitle)
                    .forEach(c => card.buildNodes(c.id, c.name, c.content, c.imageUrl, c.tags))
            }
        }

    });
}