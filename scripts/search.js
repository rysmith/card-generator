var search = (function() {
    function getSearchInfo() {
        return document.getElementById('search-info')
    }

    function getSearchInput() {
        return document.getElementById('search')
    }

    function removeSearchInfoDisplay() {
        var searchInfo = getSearchInfo().children;

        Array.from(searchInfo).forEach(child => child.remove());

    }

    function addHandler() {
        getSearchInput().addEventListener('keyup', function(e) {
            if (e.key == 'Enter') {
                if (this.value === '') {
                    card.removeCarsFromDisplay();
                    removeSearchInfoDisplay();
                    card.buildCardNodes();
                } else {
                    card.removeCarsFromDisplay();
                    removeSearchInfoDisplay();
                    var cards = cardStorage.getCards(cardData => {
                        return cardData.tags && cardData.tags.includes(this.value)
                    });

                    card.buildCardNodes(cards, [
                        'No cards matched your search. Remember only tags are searchable.',
                        'fas fa-search-minus fa-7x'
                    ])

                    var searchIcon = domUtility.buildIcon('fas fa-search')
                    var currentSearchText = ' Currently filtering tags by: ';
                    var currentSearchNode = domUtility.buildNode('span', currentSearchText);
                    var currentSearchTag = tag.buildCurrentSearchTag(this.value);

                    currentSearchNode.appendChild(currentSearchTag);

                    domUtility.appendChildren(getSearchInfo(), [searchIcon, currentSearchNode]);
                }
            }
        });
    }

    return {
        addHandler: addHandler,
        getSearchInput: getSearchInput,
        removeSearchInfoDisplay: removeSearchInfoDisplay
    }
})();