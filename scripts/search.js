var search = (function() {
    function getSearchInfo() {
        return document.getElementById('search-info')
    }

    function getSearchInput() {
        return document.getElementById('search')
    }


    function removeCarsFromDisplay() {
        var cards = document.getElementById('cards').children

        Array.from(cards).forEach(card => card.remove());
    }

    function removeSearchInfoDisplay() {
        var searchInfo = getSearchInfo().children;

        Array.from(searchInfo).forEach(child => child.remove());

    }

    function addHandler() {
        getSearchInput().addEventListener('keyup', function(e) {
            if (e.key == 'Enter') {
                if (this.value === '') {
                    removeCarsFromDisplay();
                    removeSearchInfoDisplay();
                    cardStorage.getCardsFromStorage();
                } else {
                    removeCarsFromDisplay();
                    removeSearchInfoDisplay();

                    var cards = cardStorage
                        .get()
                        .filter(cardData => cardData.tags && cardData.tags.includes(this.value));

                    if (cards.length > 0) {
                        cards.forEach(cardData => {
                            card.buildNodes(
                                cardData.id,
                                cardData.name,
                                cardData.content,
                                cardData.imageUrl,
                                cardData.tags
                            )
                        });
                    } else {
                        placeholder.build(
                            'No cards matched your search. Remember only tags are searchable.',
                            'fas fa-search-minus fa-7x'
                        );
                    }

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
        removeSearchInfoDisplay: removeSearchInfoDisplay,
        removeCarsFromDisplay: removeCarsFromDisplay
    }
})();