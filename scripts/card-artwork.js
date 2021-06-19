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
            var random = wrapper.querySelector('.reset-artwork-random');
            var resetArtworkSave = wrapper.querySelector('.reset-artwork-save');
            var resetArtworkCancel = wrapper.querySelector('.reset-artwork-cancel');

            if (event.target === input && input.value != '' && event.key == 'Enter') {
                artwork.src = input.value
                cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', input.value);
                card.handleSavedDisplay(cardNode);

                removeArtworkInput(input, random, resetArtworkSave, resetArtworkCancel);
            }

            if (input.value != '' && event.target === resetArtworkSave) {
                artwork.src = input.value
                cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', input.value);
                card.handleSavedDisplay(cardNode);

                removeArtworkInput(input, random, resetArtworkSave, resetArtworkCancel);
            }

            if (event.target === random) {
                var randomImageUrl = 'https://picsum.photos/200/150?random=' + Math.random();
                artwork.src = randomImageUrl
                cardStorage.updateCardInStorage(cardNode.id, 'imageUrl', randomImageUrl);
                card.handleSavedDisplay(cardNode);

                removeArtworkInput(input, random, resetArtworkSave, resetArtworkCancel);
            }

            if (input.value === '' && event.target != random && event.target != resetArtworkCancel) {
                card.handelSaveErrorDisplay(cardNode)
            }

            if (event.target === resetArtworkCancel) {
                removeArtworkInput(input, random, resetArtworkSave, resetArtworkCancel);
                // need a wrapper around this status area
                cardNode.querySelector('.not_saved').remove();
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
        if (!wrapper.querySelector('#artwork-input')) {
            var cardNode = wrapper.parentNode;

            handleNotSavedDisplay(cardNode);

            var artworkInput = buildInput(cardNode, wrapper);

            domUtility.appendChildren(wrapper, [
                artworkInput,
                buildRandomButton(cardNode, wrapper),
                buildSaveButton(cardNode, wrapper),
                buildCancelButton(cardNode, wrapper)
            ]);

            artworkInput.focus();
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