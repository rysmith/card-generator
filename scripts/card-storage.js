var cardStorage = (function() {
    function getCardsFromStorage() {
        var cardsFromStorage = localStorage.getItem('card-storage') || '[]';
        var cards = JSON
            .parse(cardsFromStorage)
            .sort(card.sortByTitle);

        if (cards && cards.length !== 0) {
            placeholder.remove();

            cards.forEach(function(item) {
                card.buildNodes(
                    item.id,
                    item.name,
                    item.content,
                    item.imageUrl,
                    item.tags
                );
            });
        }
    }

    function removeCardFromStorage(cardId) {
        var cards = JSON.parse(localStorage.getItem('card-storage'));

        var filteredCards = cards.filter(card => cardId !== card.id);

        localStorage.setItem('card-storage', JSON.stringify(filteredCards));
    }

    function updateCardInStorage(cardId, field, newValue) {
        var storedCards = JSON.parse(localStorage.getItem('card-storage'));
        var formated;
        if (Array.isArray(newValue)) {
            formated = newValue
        } else {
            formated = newValue
                .replace(/&nbsp;/gi, ' ')
                .replace(/<br>|<div>|<\/div>/gi, '\n\r')
        }

        var updatedCards = storedCards.map(storedCard => {
            if (cardId === storedCard.id) {
                storedCard[field] = formated;
            }

            return storedCard;
        });

        localStorage.setItem('card-storage', JSON.stringify(updatedCards));
    }

    function persistCardToStorage(id, name, content, imageUrl) {
        var storageKey = 'card-storage';
        var currentCards = JSON.parse(localStorage.getItem(storageKey));

        if (!Array.isArray(currentCards)) {
            localStorage.removeItem(storageKey);
            currentCards = [];
        }

        var newCard = { id, name, content, imageUrl };

        var updatedCards = [...currentCards, newCard]

        localStorage.setItem(storageKey, JSON.stringify(updatedCards));
    }

    function removeCardsFromStorage() {
        localStorage.removeItem('card-storage');
        var cards = document.getElementById('cards');

        Array.from(cards.getElementsByClassName('card')).forEach(card => card.remove());

        placeholder.build();
    }

    return {
        getCardsFromStorage: getCardsFromStorage,
        persistCardToStorage: persistCardToStorage,
        removeCardFromStorage: removeCardFromStorage,
        removeCardsFromStorage: removeCardsFromStorage,
        updateCardInStorage: updateCardInStorage
    }
})();