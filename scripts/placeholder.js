var placeholder = (function() {
    var placeholderId = 'placeholder';

    function buildDefaults() {
        var header = domUtility.buildNode('h3', 'Currently there are no cards.')
        var content = domUtility.buildNode('p', 'Try creating one by clicking the green "Generate Card" button above.')
        var icon = domUtility.buildIcon('far fa-file fa-7x')

        return [icon, header, content]
    }

    function build(text, iconStyle) {
        var currentPlaceholder = document.getElementById(placeholderId);

        if (!currentPlaceholder) {
            var cards = document.getElementById('cards');
            var newPlaceholder = buildDefaults();

            if (text) {
                newPlaceholder = [
                    domUtility.buildIcon(iconStyle),
                    domUtility.buildNode('p', text)
                ];
            }
            var wrapper = domUtility.buildNode('div', '', [{
                key: 'id',
                value: placeholderId
            }])

            domUtility.appendChildren(wrapper, newPlaceholder);

            cards.appendChild(wrapper)
        }
    }

    function remove() {
        var currentPlaceholder = document.getElementById(placeholderId);

        if (currentPlaceholder) {
            currentPlaceholder.remove();
        }
    }

    return {
        build: build,
        remove: remove
    }
})();