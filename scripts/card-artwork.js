var cardArtwork = (function() {
    'use strict'

    function removeArtworkInput(input, random, save, cancel) {
        input.remove();
        random.remove();
        save.remove();
        cancel.remove();
    }

    function handleArtworkUpdate(cardNode, wrapper, event) {
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
            cardNode.querySelector('.not_saved').remove();
        }
    }

    function handleArtworkClick(wrapper) {
        if (!wrapper.querySelector('#artwork-input')) {
            var cardNode = wrapper.parentNode;

            card.handleNotSavedDisplay(cardNode);

            var newArtworkInput = domUtility.buildNode('input', '', [
                { key: 'id', value: 'artwork-input' },
                { key: 'placeholder', value: 'enter new image url' },
                { key: 'autofocus', value: 'true' }
            ]);
            var resetArtworkRandom = domUtility.buildNode('button', 'random', [{
                key: 'class',
                value: 'reset-artwork-random'
            }]);
            var resetArtworkSave = domUtility.buildNode('button', 'save', [{
                key: 'class',
                value: 'reset-artwork-save'
            }]);
            var resetArtworkCancel = domUtility.buildNode('button', 'cancel', [{
                key: 'class',
                value: 'reset-artwork-cancel'
            }])

            newArtworkInput.addEventListener('keyup', function(e) {
                handleArtworkUpdate(cardNode, wrapper, e);
            });

            resetArtworkRandom.addEventListener('click', function(e) {
                handleArtworkUpdate(cardNode, wrapper, e);
            });

            resetArtworkSave.addEventListener('click', function(e) {
                handleArtworkUpdate(cardNode, wrapper, e);
            });

            resetArtworkCancel.addEventListener('click', function(e) {
                handleArtworkUpdate(cardNode, wrapper, e);
            })

            domUtility.appendChildren(wrapper, [
                newArtworkInput,
                resetArtworkRandom,
                resetArtworkSave,
                resetArtworkCancel
            ]);

            newArtworkInput.focus();
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