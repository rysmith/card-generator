var tag = (function() {
    var tagClass = 'tag';
    var tagsClass = 'tags';
    var tagInputId = 'create-tag';
    var tagStorageKey = 'tags';

    function buildCurrentSearchTag(content) {
        var tagNode = domUtility.buildNode('span', content, [
            { key: 'class', value: tagClass }
        ])

        tagNode.addEventListener('click', function() {
            card.removeCarsFromDisplay();
            search.removeSearchInfoDisplay();
            card.buildCardNodes();
            card.clearInputs([search.getSearchInput()])
        });

        return tagNode;
    }

    function buildTag(tags, content) {
        var tagNode = domUtility.buildNode('span', content, [
            { key: 'class', value: tagClass }
        ])

        tagNode.addEventListener('click', function() {
            var cardNode = tags.parentNode;

            handleTagClick(tagNode, cardNode.id)
            tagNode.remove();
        });

        tags.appendChild(tagNode);
    }

    function buildTags(currentTags) {
        var label = domUtility.buildNode('label', '', [
            { key: 'for', value: tagInputId }
        ])
        var icon = domUtility.buildIcon('fas fa-tag');
        var tags = domUtility.buildNode('div', '', [
            { key: 'class', value: tagsClass }
        ]);

        label.appendChild(icon)
        tags.appendChild(label);

        if (currentTags) {
            currentTags.map(tagContent => buildTag(tags, tagContent))
        }

        label.addEventListener('click', function() {
            handleLabelClick(tags)
        });

        return tags
    }

    function handleLabelClick(tags) {
        var card = tags.parentNode
        var newTagInput = domUtility.buildNode('input', '', [
            { key: 'id', value: tagInputId },
            { key: 'placeholder', value: 'tag name, e.g. GBH' },
            { key: 'autofocus', value: 'true' }
        ])

        newTagInput.addEventListener('keyup', function(e) {
            handleTagSave(this, e, tags, card)
        });

        card.appendChild(newTagInput)
    }

    function handleTagClick(tag, cardId) {
        var cardData = cardStorage.getCardById(cardId);
        var tagIndex = cardData.tags.indexOf(tag.innerHTML.replace(',', ''));

        cardData.tags.splice(tagIndex, 1);
        cardStorage.updateCardInStorage(cardData.id, tagStorageKey, cardData.tags)
    }


    function handleTagSave(tagInput, event, tags, cardNode) {
        if (event.key == 'Enter') {
            if (tagInput.value !== '') {
                var newTag = domUtility.buildNode('span', tagInput.value.replace(',', ''), [
                    { key: 'class', value: tagClass }
                ])

                newTag.addEventListener('click', function() {
                    handleTagClick(this, cardNode.id);
                    this.remove();
                })

                tags.appendChild(newTag);

                var updatedTags = Array.from(tags.children)
                    .map(child => child.innerHTML.replace(/,/, ''))
                    .slice(1)

                cardStorage.updateCardInStorage(cardNode.id, tagStorageKey, updatedTags)
                card.handleSavedDisplay(cardNode)
            }

            tagInput.remove();
        }
    }

    return {
        buildCurrentSearchTag: buildCurrentSearchTag,
        buildTags: buildTags
    }
})();