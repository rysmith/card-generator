var card = (function() {
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

        cardStorage.updateCardInStorage(card.id, fieldName, value)
        handleSavedDisplay(card)
    }

    function buildNodes(id, title, content, imageUrl, tags) {
        var cards = document.getElementById('cards');
        var newCard = buildCard(id);

        domUtility.appendChildren(newCard, [
            tag.buildTags(tags),
            buildCardTitle(title),
            buildCardArtWork(imageUrl),
            buildCardContent(content),
            buildRemoveCard()
        ])

        cards.appendChild(newCard);
    }

    function generateCard() {
        var name = document.getElementById('name');
        var content = document.getElementById('content');
        var image = document.getElementById('image-url');
        var imageUrl = image.value || 'https://picsum.photos/260?random=' + Math.random();
        var cardId = generateCardId();

        buildNodes(cardId, name.value, content.value, imageUrl, []);
        cardStorage.persistCardToStorage(cardId, name.value, content.value, imageUrl);
        clearInputs([name, content, image]);
        placeholder.remove();
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
            cardStorage.removeCardFromStorage(this.parentNode.id)
            var cardsInStorage = cardStorage.get();
            var cardsDiplayed = document.querySelector('.card');

            if (!cardsDiplayed && cardsInStorage.length > 0) {
                placeholder.build(
                    'No cards matched your search. Remember only tags are searchable.',
                    'fas fa-search-minus fa-7x'
                );
            }

            if (!cardsDiplayed && cardsInStorage.length === 0) {
                placeholder.build();
                var search = document.getElementById('search');
                var searchInfo = document.getElementById('search-info');

                clearInputs([search]);
                Array.from(searchInfo.children).forEach(child => child.remove());

            }
        })

        return removeCard
    }

    function clearInputs(inputs) {
        inputs.forEach(input => input.value = '');
    }

    return {
        clearInputs: clearInputs,
        buildNodes: buildNodes,
        generateCard: generateCard,
        handleSavedDisplay: handleSavedDisplay
    }
})()