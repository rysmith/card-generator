var placeholder = (function() {
    function build() {
        var cardsNode = document.getElementById('cards');
        var placeholder = document.getElementById('placeholder');

        if (!placeholder) {
            var newPlaceholder = domUtility.buildNode('div', 'Cards go here.', [
                { key: 'id', value: 'placeholder' }
            ]);

            cardsNode.appendChild(newPlaceholder);
        }
    }

    function remove() {
        var placeholder = document.getElementById('placeholder');
        if (placeholder) {
            placeholder.remove();
        }
    }

    return {
        build: build,
        remove: remove
    }
})();