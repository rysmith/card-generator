var cardArtwork = (function() {
    'use strict'

    var styleAttributes = {
        image: 'artwork',
        wrapper: 'artwork-update',
        input: 'artwork-input',
        randomButton: 'reset-artwork-random',
        saveButton: 'reset-artwork-save',
        cancelButton: 'reset-artwork-cancel'
    }

    function styleAttribute(attribute) {
        return styleAttributes[attribute]
    }

    function styleSelector(attribute) {
        return `.${styleAttribute(attribute)}`
    }

    function removeArtworkUpdate(cardNode) {
        cardNode.querySelector(styleSelector('wrapper')).remove();
    }

    function buildInput(cardNode) {
        var inputNode = domUtility.buildNode('input', '', [
            { key: 'class', value: styleAttribute('input') },
            { key: 'placeholder', value: 'enter new image url' },
            { key: 'autofocus', value: 'true' }
        ]);

        inputNode.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                var newUrl = inputNode.value;

                if (newUrl != '') {
                    var artwork = cardNode.querySelector(styleAttribute('image'));

                    artwork.src = input.value
                    cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', newUrl);
                    cardMessage.buildSaved(cardNode);
                    removeArtworkUpdate(cardNode);
                } else {
                    cardMessage.buildSaveError(cardNode);
                }
            }

        });

        inputNode.addEventListener('focus', function() {
            cardMessage.buildNotSaved(cardNode)
        });

        return inputNode;
    }

    function buildRandomButton(cardNode) {
        var randomButton = domUtility.buildNode('button', 'random', [{
            key: 'class',
            value: styleAttribute('randomButton')
        }]);

        randomButton.addEventListener('click', function() {
            var randomImageUrl = 'https://picsum.photos/200/150?random=' + Math.random();
            var artwork = cardNode.querySelector(styleSelector('image'));

            artwork.src = randomImageUrl;
            cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', randomImageUrl);
            cardMessage.removeCurrentMessage(cardNode);
            cardMessage.buildSaved(cardNode);
            removeArtworkUpdate(cardNode);
        });


        return randomButton;
    }

    function buildSaveButton(cardNode, input) {
        var saveButton = domUtility.buildNode('button', 'save', [{
            key: 'class',
            value: styleAttribute('saveButton')
        }]);

        saveButton.addEventListener('click', function() {
            var newUrl = input.value;

            if (newUrl != '') {
                var artwork = cardNode.querySelector(styleSelector('image'));

                artwork.src = newUrl;
                cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', newUrl);
                cardMessage.buildSaved(cardNode);
                removeArtworkUpdate(cardNode);
            } else {
                cardMessage.buildSaveError(cardNode);
            }

        });

        return saveButton;
    }

    function buildCancelButton(cardNode) {
        var cancelButton = domUtility.buildNode('button', 'cancel', [{
            key: 'class',
            value: styleAttribute('cancelButton')
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
            value: styleAttribute('wrapper')
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
            var currentInput = cardNode.querySelector(styleSelector('input'));

            if (!currentInput) {
                buildArtworkUpdate(cardNode, artworkWrapper);
                cardMessage.buildNotSaved(cardNode);
            } else {
                currentInput.focus();
                cardMessage.buildNotSaved(cardNode);
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