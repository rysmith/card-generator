var search = (function() {
    function getSearchInfo() {
        return document.getElementById('search-info')
    }

    function getSearchInput() {
        return document.getElementById('search')
    }

    function removeSearchInfoDisplay(searchInfo = {}) {
        var searchInfo = searchInfo.children || getSearchInfo().children;

        Array.from(searchInfo).forEach(child => child.remove());

    }

    function displayAllCardsWithWarning() {
        var cardsBuilt = card.buildCardNodes();

        var searchInfo = getSearchInfo();
        var searchNodeText;
        var removeAfter;

        if (cardsBuilt === 0) {
            removeAfter = 10000;
            searchNodeText = ' ⚠️  There are no cards to search currently. To start creating your deck, click the green "Generate Card" button.'
        } else {
            removeAfter = 3000;
            searchNodeText = ' ⚠️  Empty searches defaults to return all cards.'
        }
        var currentSearchNode = domUtility.buildNode('span', searchNodeText);

        searchInfo.appendChild(currentSearchNode);

        setTimeout(function() {
            removeSearchInfoDisplay(searchInfo)
        }, removeAfter);
    }

    function displaySearchResults(searchInputValue) {
        var cards = cardStorage.getCards(cardData => {
            return cardData.tags && cardData.tags.includes(searchInputValue)
        });

        card.buildCardNodes(cards, 'notFound')

        var currentSearchText = ' Currently filtering tags by: ';
        var currentSearchNode = domUtility.buildNode('span', currentSearchText);
        var currentSearchTag = tag.buildCurrentSearchTag(searchInputValue);

        currentSearchNode.appendChild(currentSearchTag);

        getSearchInfo().appendChild(currentSearchNode)
    }

    function handleSearch() {
        card.removeCarsFromDisplay();
        removeSearchInfoDisplay();

        var searchInputValue = this.value;

        if (!searchInputValue) {
            displayAllCardsWithWarning()
        } else {
            displaySearchResults(searchInputValue)
        }
    }

    function addInputHandler() {
        getSearchInput().addEventListener('keyup', function(e) {
            if (e.key == 'Enter') {
                handleSearch.call(this);
            }
        });
    }

    function buttonClickHandler() {
        var searchInput = getSearchInput();

        handleSearch.call(searchInput)
    }

    return {
        addInputHandler: addInputHandler,
        handleSearch: handleSearch,
        getSearchInput: getSearchInput,
        buttonClickHandler: buttonClickHandler,
        removeSearchInfoDisplay: removeSearchInfoDisplay
    }
})();