document.addEventListener("DOMContentLoaded", function() {
    addEnterSubmitListener();
    getCardsFromStorage();
    addSearchListener();
});

function addSearchListener() {
    var search = document.getElementById('search')

    search.addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            if (this.value === '') {
                Array.from(document.getElementById('cards').children).forEach(card => card.remove());

                getCardsFromStorage();
            } else {
                var cards = JSON.parse(localStorage.getItem('card-storage'));
                Array.from(document.getElementById('cards').children).forEach(card => card.remove());

                cards
                    .filter(card => card.tags)
                    .filter(card => card.tags.includes(this.value))
                    .forEach(card => buildCardNodes(card.id, card.name, card.content, card.imageUrl, card.tags))
            }
        }

    });
}

function addEnterSubmitListener() {
    document.getElementById('content').addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            generateCard();
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

function getCardsFromStorage() {
    var cards = JSON.parse(localStorage.getItem('card-storage'));

    if (cards && cards.length !== 0) {
        removePlaceholder();

        cards.forEach(function(card) {
            buildCardNodes(card.id, card.name, card.content, card.imageUrl, card.tags);
        });
    } else {
        addPlaceholder();
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

function handleNotSavedDisplay() {
    var card = this.parentNode
    var existingStatus = card.getElementsByClassName('not_saved');

    Array.from(existingStatus).forEach(status => status.remove());

    var saveStatus = domUtility.buildNode('div', '', [
        { key: 'class', value: 'not_saved' }
    ]);

    var saveIcon = domUtility.buildIcon('fas fa-save')

    saveStatus.appendChild(saveIcon)
    card.appendChild(saveStatus)
}

function handleSavedDisplay(card) {
    var existingStatus = card.getElementsByClassName('not_saved');

    Array.from(existingStatus).forEach(status => status.remove());

    var saveStatus = domUtility.buildNode('div', '', [
        { key: 'class', value: 'saved' }
    ]);

    var saveIcon = domUtility.buildIcon('fas fa-save')

    saveStatus.appendChild(saveIcon)
    card.appendChild(saveStatus);

    setTimeout(function() {
        var savedStatus = card.getElementsByClassName('saved');

        Array.from(savedStatus).forEach(status => status.remove());
    }, 2000);
}

function handleCardSave(fieldName) {
    var card = this.parentNode;
    var value = this.innerHTML;

    updateCardInStorage(card.id, fieldName, value)
    handleSavedDisplay(card)
}

function buildCardNodes(id, title, content, imageUrl, tags) {
    var cards = document.getElementById('cards');
    var newCard = buildCard(id);

    domUtility.appendChildren(newCard, [
        buildCardTags(tags),
        buildCardTitle(title),
        buildCardArtWork(imageUrl),
        buildCardContent(content),
        buildRemoveCard()
    ])

    cards.appendChild(newCard);
}

function handleTagClick(tag, cardId) {
    var card = JSON.parse(localStorage.getItem('card-storage')).find(card => card.id === cardId)
    var tagIndex = card.tags.indexOf(tag.innerHTML.replace(',', ''));

    card.tags.splice(tagIndex, 1);
    updateCardInStorage(card.id, 'tags', card.tags)
    tag.remove();
}

function handleTagSave(tagInput, event, tags, card) {
    if (event.key == 'Enter') {
        if (tagInput.value !== '') {
            var newTag = domUtility.buildNode('span', tagInput.value.replace(',', ''), [
                { key: 'class', value: 'tag' }
            ])

            newTag.addEventListener('click', function() {
                handleTagClick(newTag, card.id)
            })

            tags.appendChild(newTag);

            var updatedTags = Array.from(tags.children)
                .map(child => child.innerHTML.replace(/,/, ''))
                .slice(1)

            updateCardInStorage(card.id, 'tags', updatedTags)
            handleSavedDisplay(card)
        }

        tagInput.remove();
    }
}

function buildCardTags(currentTags) {
    var label = domUtility.buildNode('label', '', [
        { key: 'for', value: 'create-tag' }
    ])
    var icon = domUtility.buildIcon('fas fa-tag');
    var tags = domUtility.buildNode('div', '', [
        { key: 'class', value: 'tags' }
    ]);

    label.appendChild(icon)
    tags.appendChild(label);

    if (currentTags) {
        currentTags.map(currentTag => {
            var tagNode = domUtility.buildNode('span', currentTag, [
                { key: 'class', value: 'tag' }
            ])

            tagNode.addEventListener('click', function() {
                var card = tags.parentNode

                handleTagClick(tagNode, card.id)
            });

            tags.appendChild(tagNode);
        });
    }

    label.addEventListener('click', function() {
        var card = tags.parentNode
        var newTagInput = domUtility.buildNode('input', '', [
            { key: 'id', value: 'create-tag' },
            { key: 'placeholder', value: 'tag name, e.g. GBH' },
            { key: 'autofocus', value: 'true' }
        ])

        newTagInput.addEventListener('keyup', function(e) {
            handleTagSave(this, e, tags, card)
        });

        card.appendChild(newTagInput)
    });

    return tags
}

function generateCard() {
    var name = document.getElementById('name');
    var content = document.getElementById('content');
    var image = document.getElementById('image-url');
    var imageUrl = image.value || 'https://picsum.photos/260?random=' + Math.random();
    var cardId = generateCardId();

    buildCardNodes(cardId, name.value, content.value, imageUrl, []);
    persistCardToStorage(cardId, name.value, content.value, imageUrl);
    clearInputs([name, content, image]);
    removePlaceholder();
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



    node.addEventListener('focus', function() {
        handleNotSavedDisplay.call(this)
    });

    node.addEventListener('blur', function() {
        handleCardSave.call(this, ['name'])
    })

    return node;
}

function buildCardArtWork(imageUrl) {
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

    node.addEventListener('focus', function() {
        handleNotSavedDisplay.call(this)
    });

    node.addEventListener('blur', function() {
        handleCardSave.call(this, ['content'])
    })

    return node
}

function buildRemoveCard() {
    var icon = domUtility.buildIcon('fas fa-times-circle remove');
    var removeCard = domUtility.buildNode('div', '', [{ key: 'class', value: 'remove' }]);
    removeCard.appendChild(icon);
    removeCard.addEventListener('click', function() {
        this.parentNode.remove();
        removeCardFromStorage(this.parentNode.id)
        var storageKey = 'card-storage';
        var currentCards = JSON.parse(localStorage.getItem(storageKey));

        if (currentCards.length === 0) {
            addPlaceholder();
        }
    })

    return removeCard
}

function clearInputs(inputs) {
    inputs.forEach(input => input.value = '');
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

    addPlaceholder();
}