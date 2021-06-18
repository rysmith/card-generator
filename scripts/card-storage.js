var cardStorage = (function() {
    'use strict'

    var storageKey = 'card-storage';

    function sortByTitle(cardA, cardB) {
        var titleA = cardA.name.toLowerCase();
        var titleB = cardB.name.toLowerCase();

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }

        return 0;
    }

    function getCards(filterFn) {
        var filterBy;

        if (filterFn) {
            filterBy = filterFn
        } else {
            filterBy = card => card
        }

        return JSON
            .parse(localStorage.getItem(storageKey) || '[]')
            .filter(filterBy)
            .sort(sortByTitle);
    }

    function getCardById(cardId) {
        return getCards(card => card.id === cardId)[0]
    }

    function removeCardFromStorage(cardId) {
        var filteredCards = getCards(card => cardId !== card.id);

        localStorage.setItem(storageKey, JSON.stringify(filteredCards));
    }

    function updateCardInStorage(cardId, field, newValue) {
        var storedCards = getCards();
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

    function saveCardToStorage(id, name, content, imageUrl) {
        var currentCards = getCards();

        if (!Array.isArray(currentCards)) {
            console.log('⚠️  `card-storage` is not an array and will not be parsed correctly.')
        }

        var newCard = { id, name, content, imageUrl };

        var updatedCards = [...currentCards, newCard]

        localStorage.setItem(storageKey, JSON.stringify(updatedCards));
    }

    return {
        getCards: getCards,
        getCardById: getCardById,
        saveCardToStorage: saveCardToStorage,
        removeCardFromStorage: removeCardFromStorage,
        updateCardInStorage: updateCardInStorage
    }
})();