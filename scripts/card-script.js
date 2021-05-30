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
        var searchInfo = document.getElementById('search-info');

        if (e.key == 'Enter') {
            if (this.value === '') {
                Array.from(document.getElementById('cards').children).forEach(card => card.remove());
                Array.from(searchInfo.children).forEach(child => child.remove());

                cardStorage.getCardsFromStorage();
            } else {
                Array.from(document.getElementById('cards').children).forEach(card => card.remove());
                Array.from(searchInfo.children).forEach(child => child.remove());

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
                    placeholder.build(
                        'No cards matched your search. Remember only tags are searchable.',
                        'fas fa-search-minus fa-7x'
                    );
                }

                var searchIcon = domUtility.buildIcon('fas fa-search')
                var currentSearchText = ' Currently filtering tags by: ' + this.value;
                var currentSearchNode = domUtility.buildNode('span', currentSearchText);

                domUtility.appendChildren(searchInfo, [searchIcon, currentSearchNode]);
            }
        }
    });
}