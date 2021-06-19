var cardArtwork = (function() {
    'use strict'

    function removeArtworkInput(input, random, save, cancel) {
        input.remove();
        random.remove();
        save.remove();
        cancel.remove();
    }

    function handleArtworkUpdate(cardNode, wrapper) {
        return function(event) {
            var artwork = wrapper.querySelector('.artwork');
            var input = wrapper.querySelector('#artwork-input');
            var randomButton = wrapper.querySelector('.reset-artwork-random');
            var saveButton = wrapper.querySelector('.reset-artwork-save');
            var cancelButton = wrapper.querySelector('.reset-artwork-cancel');

            if (event.target === input && input.value != '' && event.key == 'Enter') {
                artwork.src = input.value
                cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', input.value);
                cardMessage.handleSavedDisplay(cardNode);

                removeArtworkInput(input, randomButton, saveButton, cancelButton);
            }

            if (input.value != '' && event.target === saveButton) {
                artwork.src = input.value
                cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', input.value);
                cardMessage.handleSavedDisplay(cardNode);

                removeArtworkInput(input, randomButton, saveButton, cancelButton);
            }

            if (event.target === randomButton) {
                var randomImageUrl = 'https://picsum.photos/200/150?random=' + Math.random();
                artwork.src = randomImageUrl
                cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', randomImageUrl);
                cardMessage.removeCurrentMessage(cardNode);
                cardMessage.handleSavedDisplay(cardNode);

                removeArtworkInput(input, randomButton, saveButton, cancelButton);
            }

            if (input.value === '' && event.target != randomButton && event.target != cancelButton) {
                cardMessage.handelSaveErrorDisplay(cardNode)
            }

            if (event.target === cancelButton) {
                removeArtworkInput(input, randomButton, saveButton, cancelButton);
                cardMessage.removeCurrentMessage(cardNode);
            }
        }
    }

    function buildInput(cardNode, wrapper) {
        var inputNode = domUtility.buildNode('input', '', [
            { key: 'id', value: 'artwork-input' },
            { key: 'placeholder', value: 'enter new image url' },
            { key: 'autofocus', value: 'true' }
        ]);

        inputNode.addEventListener('keyup', handleArtworkUpdate(cardNode, wrapper));
        inputNode.addEventListener('focus', function() {
            cardMessage.handleNotSavedDisplay(cardNode)
        });

        return inputNode
    }

    function buildRandomButton(cardNode, wrapper) {
        var randomButton = domUtility.buildNode('button', 'random', [{
            key: 'class',
            value: 'reset-artwork-random'
        }]);

        randomButton.addEventListener('click', handleArtworkUpdate(cardNode, wrapper));

        return randomButton;
    }

    function buildSaveButton(cardNode, wrapper) {
        var saveButton = domUtility.buildNode('button', 'save', [{
            key: 'class',
            value: 'reset-artwork-save'
        }]);

        saveButton.addEventListener('click', handleArtworkUpdate(cardNode, wrapper));

        return saveButton;
    }

    function buildCancelButton(cardNode, wrapper) {
        var cancelButton = domUtility.buildNode('button', 'cancel', [{
            key: 'class',
            value: 'reset-artwork-cancel'
        }]);

        cancelButton.addEventListener('click', handleArtworkUpdate(cardNode, wrapper));

        return cancelButton;
    }

    function handleArtworkClick(wrapper) {
        var currentInput = wrapper.querySelector('#artwork-input');
        var cardNode = wrapper.parentNode;

        if (!currentInput) {
            cardMessage.handleNotSavedDisplay(cardNode);

            var artworkInput = buildInput(cardNode, wrapper);

            domUtility.appendChildren(wrapper, [
                artworkInput,
                buildRandomButton(cardNode, wrapper),
                buildSaveButton(cardNode, wrapper),
                buildCancelButton(cardNode, wrapper)
            ]);

            artworkInput.focus();
        } else {
            currentInput.focus();
            cardMessage.handleNotSavedDisplay(cardNode);
        }
    }

    function build(imageUrl) {
        var wrapper = domUtility.buildNode('div', '', [{
            key: 'class',
            value: 'artwork-wrapper'
        }]);
        var artwork = domUtility.buildNode('img', '', [
            { key: 'src', value: imageUrl },
            { key: 'class', value: 'artwork' }
        ]);

        wrapper.appendChild(artwork)

        artwork.addEventListener('click', function() {
            handleArtworkClick(wrapper);
        })

        return wrapper
    }

    return {
        build: build
    }
})();