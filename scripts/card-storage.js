var cardStorage = (function() {
    var storageKey = 'card-storage';

    function sortByTitle(a, b) {
        var cardA = a.name.toUpperCase();
        var cardB = b.name.toUpperCase();

        if (cardA < cardB) {
            return -1;
        }
        if (cardA > cardB) {
            return 1;
        }

        return 0;
    }

    function get() {
        return JSON
            .parse(localStorage.getItem(storageKey) || '[]')
            .sort(sortByTitle);
    }

    function getCardById(cardId) {
        return get().find(card => card.id === cardId)
    }

    function getCardsFromStorage() {
        var cards = get();

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
        } else {
            placeholder.build();
        }
    }

    function removeCardFromStorage(cardId) {
        var filteredCards = get().filter(card => cardId !== card.id);

        localStorage.setItem(storageKey, JSON.stringify(filteredCards));
    }

    function updateCardInStorage(cardId, field, newValue) {
        var storedCards = get();
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

        localStorage.setItem(storageKey, JSON.stringify(updatedCards));
    }

    function persistCardToStorage(id, name, content, imageUrl) {
        var currentCards = get();

        if (!Array.isArray(currentCards)) {
            localStorage.removeItem(storageKey);
            currentCards = [];
        }

        var newCard = { id, name, content, imageUrl };

        var updatedCards = [...currentCards, newCard]

        localStorage.setItem(storageKey, JSON.stringify(updatedCards));
    }

    function removeCardsFromStorage() {
        localStorage.removeItem(storageKey);
        var cards = document.getElementById('cards');

        Array.from(cards.getElementsByClassName('card')).forEach(card => card.remove());

        placeholder.build();
    }

    return {
        get: get,
        getCardById: getCardById,
        getCardsFromStorage: getCardsFromStorage,
        persistCardToStorage: persistCardToStorage,
        removeCardFromStorage: removeCardFromStorage,
        removeCardsFromStorage: removeCardsFromStorage,
        updateCardInStorage: updateCardInStorage
    }
})();