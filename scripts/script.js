document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('content').addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            generateCard();
        }
    });

});

function generateCard() {
    var name = document.getElementById('name');
    var content = document.getElementById('content')
    var cards = document.getElementById('cards');

    var card = buildCard();

    domUtility.appendChildren(card, [
        buildCardTitle(name),
        buildCardArtWork(),
        buildCardContent(content),
        buildRemoveCard()
    ])

    cards.appendChild(card);

    clearInputs([name, content])
}

function buildCard() {
    return domUtility.buildNode('div', '', [{ key: 'class', value: 'card' }]);
}

function buildCardTitle(input) {
    return domUtility.buildNode('div', input.value, [
        { key: 'class', value: 'title' },
        { key: 'contentEditable', value: 'true' }
    ]);
}

function buildCardArtWork() {
    return domUtility.buildNode('img', '', [
        { key: 'src', value: 'https://picsum.photos/260' },
        { key: 'class', value: 'artwork' },
    ]);
}

function buildCardContent(input) {
    return domUtility.buildNode('div', input.value, [
        { key: 'class', value: 'content' },
        { key: 'contentEditable', value: 'true' }
    ]);
}

function buildRemoveCard() {
    var removeCard = domUtility.buildNode('div', 'X', [{ key: 'class', value: 'remove' }]);

    removeCard.addEventListener('click', function() {
        this.parentNode.remove();
    })

    return removeCard
}

function clearInputs(inputs) {
    inputs.forEach(input => input.value = '');
}