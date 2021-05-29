var placeholder = (function() {
    var placeholderId = 'placeholder';
    var defaultText = 'Currently there are no cards.  Try creating one by clicking the green "Generate Card" button above.';

    function build(text) {
        var cardsNode = document.getElementById('cards');
        var placeholder = document.getElementById(placeholderId);
        var placeholderText = text || defaultText

        if (!placeholder) {
            var newPlaceholder = domUtility.buildNode('div', placeholderText, [
                { key: 'id', value: placeholderId }
            ]);

            cardsNode.appendChild(newPlaceholder);
        }
    }

    function remove() {
        var placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            placeholder.remove();
        }
    }

    return {
        build: build,
        remove: remove
    }
})();