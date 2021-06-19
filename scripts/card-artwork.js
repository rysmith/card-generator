var cardArtwork = (function() {
    'use strict'

    function removeArtworkUpdate(cardNode) {
        cardNode.querySelector('.artwork-update').remove();
    }

    function buildInput(cardNode) {
        var inputNode = domUtility.buildNode('input', '', [
            { key: 'id', value: 'artwork-input' },
            { key: 'placeholder', value: 'enter new image url' },
            { key: 'autofocus', value: 'true' }
        ]);

        inputNode.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                var newUrl = inputNode.value;

                if (newUrl != '') {
                    var artwork = cardNode.querySelector('.artwork');

                    artwork.src = input.value
                    cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', newUrl);
                    cardMessage.handleSavedDisplay(cardNode);
                    removeArtworkUpdate(cardNode);
                } else {
                    cardMessage.handelSaveErrorDisplay(cardNode);
                }
            }

        });

        inputNode.addEventListener('focus', function() {
            cardMessage.handleNotSavedDisplay(cardNode)
        });

        return inputNode;
    }

    function buildRandomButton(cardNode) {
        var randomButton = domUtility.buildNode('button', 'random', [{
            key: 'class',
            value: 'reset-artwork-random'
        }]);

        randomButton.addEventListener('click', function() {
            var randomImageUrl = 'https://picsum.photos/200/150?random=' + Math.random();
            var artwork = cardNode.querySelector('.artwork');

            artwork.src = randomImageUrl;
            cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', randomImageUrl);
            cardMessage.removeCurrentMessage(cardNode);
            cardMessage.handleSavedDisplay(cardNode);
            removeArtworkUpdate(cardNode);
        });


        return randomButton;
    }

    function buildSaveButton(cardNode, input) {
        var saveButton = domUtility.buildNode('button', 'save', [{
            key: 'class',
            value: 'reset-artwork-save'
        }]);

        saveButton.addEventListener('click', function() {
            var newUrl = input.value;

            if (newUrl != '') {
                var artwork = cardNode.querySelector('.artwork');

                artwork.src = newUrl;
                cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', newUrl);
                cardMessage.handleSavedDisplay(cardNode);
                removeArtworkUpdate(cardNode);
            } else {
                cardMessage.handelSaveErrorDisplay(cardNode);
            }

        });

        return saveButton;
    }

    function buildCancelButton(cardNode) {
        var cancelButton = domUtility.buildNode('button', 'cancel', [{
            key: 'class',
            value: 'reset-artwork-cancel'
        }]);

        cancelButton.addEventListener('click', function() {
            removeArtworkUpdate(cardNode);
            cardMessage.removeCurrentMessage(cardNode);
        });

        return cancelButton;
    }

    function buildArtworkUpdate(cardNode, artworkWrapper) {
        var artworkInput = buildInput(cardNode);
        var artworkUpdate = domUtility.buildNode('div', '', [{
            key: 'class',
            value: 'artwork-update'
        }]);

        domUtility.appendChildren(artworkUpdate, [
            artworkInput,
            buildRandomButton(cardNode),
            buildSaveButton(cardNode, artworkInput),
            buildCancelButton(cardNode)
        ]);
        artworkWrapper.appendChild(artworkUpdate)
        artworkInput.focus();
    }

    function handleArtworkClick(cardNode, artworkWrapper) {
        return function() {
            var currentInput = cardNode.querySelector('#artwork-input');

            if (!currentInput) {
                cardMessage.handleNotSavedDisplay(cardNode);
                buildArtworkUpdate(cardNode, artworkWrapper);
            } else {
                currentInput.focus();
                cardMessage.handleNotSavedDisplay(cardNode);
            }
        }

    }

    function build(imageUrl, cardNode) {
        var wrapper = domUtility.buildNode('div', '', [{
            key: 'class',
            value: 'artwork-wrapper'
        }]);
        var artwork = domUtility.buildNode('img', '', [
            { key: 'src', value: imageUrl },
            { key: 'class', value: 'artwork' }
        ]);

        wrapper.appendChild(artwork)
        artwork.addEventListener('click', handleArtworkClick(cardNode, wrapper));

        return wrapper
    }

    return {
        build: build
    }
})();