document.addEventListener("DOMContentLoaded", function() {
    addEnterSubmitListener();
    addSearchListener();
    placeholder.build();
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
                Array.from(document.getElementById('cards').children).forEach(card => card.remove());

                var cards = cardStorage
                    .get()
                    .filter(cardData => cardData.tags && cardData.tags.includes(this.value));

                if (cards.length > 0) {
                    cards.forEach(cardData => {
                        card.buildNodes(
                            cardData.id,
                            cardData.name,
                            cardData.content,
                            cardData.imageUrl,
                            cardData.tags
                        )
                    });
                } else {
                    placeholder.build('No cards matched your search.');
                }

            }
        }
    });
}