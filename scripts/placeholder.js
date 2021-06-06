var placeholder = (function() {
    var placeholderId = 'placeholder';

    function buildDefaults() {
        var header = domUtility.buildNode('h3', 'Currently there are no cards.')
        var content = domUtility.buildNode('p', 'Try creating one by clicking the green "Generate Card" button above.')
        var icon = domUtility.buildIcon('far fa-file fa-7x')

        return [icon, header, content]
    }

    function buildNotFound() {
        var header = domUtility.buildNode('h3', 'No cards matched your search')
        var content = domUtility.buildNode('p', 'Remember only tags are searchable.')
        var icon = domUtility.buildIcon('fas fa-search-minus fa-7x')

        return [icon, header, content]
    }

    function build(type = null) {
        var currentPlaceholder = document.getElementById(placeholderId);

        if (!currentPlaceholder) {
            var newPlaceholder;
            var cards = document.getElementById('cards');
            var wrapper = domUtility.buildNode('div', '', [{
                key: 'id',
                value: placeholderId
            }])

            switch (type) {
                case 'notFound':
                    newPlaceholder = buildNotFound();
                    break;
                default:
                    newPlaceholder = buildDefaults();
            }

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