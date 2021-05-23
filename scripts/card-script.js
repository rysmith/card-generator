document.addEventListener("DOMContentLoaded", function() {
    addEnterSubmitListener();
    getCardsFromStorage();
});

function addEnterSubmitListener() {
    document.getElementById('content').addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            generateCard();
        }
    });
}

function getCardsFromStorage() {
    var cards = localStorage.getItem('card-storage')

    if (cards) {
        JSON.parse(cards).forEach(function(card) {
            buildCardNodes(card.id, card.name, card.content);
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
    var formated = newValue
        .replace(/&nbsp;/gi, ' ')
        .replace(/<br>|<div>|<\/div>/gi, '\n\r')
    var updatedCards = storedCards.map(storedCard => {
        if (cardId === storedCard.id) {
            storedCard[field] = formated;
        }

        return storedCard;
    });

    localStorage.setItem('card-storage', JSON.stringify(updatedCards));
}

function buildCardNodes(id, title, content) {
    var cards = document.getElementById('cards');
    var newCard = buildCard(id);

    domUtility.appendChildren(newCard, [
        buildCardTitle(title),
        buildCardArtWork(),
        buildCardContent(content),
        buildRemoveCard()
    ])

    cards.appendChild(newCard);
}

function generateCard() {
    var name = document.getElementById('name');
    var content = document.getElementById('content');
    var placeholder = document.getElementById('placeholder');
    var cardId = generateCardId();

    if (placeholder) {
        placeholder.remove();
    }

    buildCardNodes(cardId, name.value, content.value);

    persistCardToStorage(cardId, name.value, content.value);
    clearInputs([name, content]);
}

function generateCardId() {
    return 'card-' + Date.now() + '-' + Math.random().toString().split('.')[1]
}

function buildCard(id) {
    return domUtility.buildNode('div', '', [
        { key: 'class', value: 'card' },
        { key: 'id', value: id }
    ]);
}

function buildCardTitle(title) {
    var node = domUtility.buildNode('div', title, [
        { key: 'class', value: 'title' },
        { key: 'contentEditable', value: 'true' }
    ]);

    node.addEventListener('blur', function() {
        var card = this.parentNode;
        var title = this.innerHTML;

        updateCardInStorage(card.id, 'name', title)
    })

    return node;
}

function buildCardArtWork() {
    var imageUrl = 'https://picsum.photos/260?random=' + Math.random()
    return domUtility.buildNode('img', '', [
        { key: 'src', value: imageUrl },
        { key: 'class', value: 'artwork' },
    ]);
}

function buildCardContent(content) {
    var node = domUtility.buildNode('div', content, [
        { key: 'class', value: 'content' },
        { key: 'contentEditable', value: 'true' }
    ]);

    node.addEventListener('blur', function(e) {
        var card = this.parentNode;
        var content = this.innerHTML;
        updateCardInStorage(card.id, 'content', content);
    })

    return node
}

function buildRemoveCard() {
    var removeCard = domUtility.buildNode('div', 'X', [{ key: 'class', value: 'remove' }]);

    removeCard.addEventListener('click', function() {
        this.parentNode.remove();
        removeCardFromStorage(this.parentNode.id)
    })

    return removeCard
}

function clearInputs(inputs) {
    inputs.forEach(input => input.value = '');
}

function persistCardToStorage(id, name, content) {
    var storageKey = 'card-storage';
    var currentCards = JSON.parse(localStorage.getItem(storageKey));

    if (!Array.isArray(currentCards)) {
        localStorage.removeItem(storageKey);
        currentCards = [];
    }

    var newCard = { id, name, content };

    var updatedCards = [...currentCards, newCard]

    localStorage.setItem(storageKey, JSON.stringify(updatedCards));
}

function removeCardsFromStorage() {
    localStorage.removeItem('card-storage');
    var cards = document.getElementById('cards');

    Array.from(cards.children).forEach(card => card.remove());

    cards.innerHTML = 'Cards go here.'
}