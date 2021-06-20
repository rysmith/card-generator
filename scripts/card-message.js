var cardMessage = (function() {
    'use strict'

    var messageClass = 'card-message-wrapper';
    var savedClass = 'card-message-saved';
    var notSavedClass = 'card-message-not-saved';
    var saveErrorClass = 'card-message-save-error'
    var msUntilExpiration = 2000;

    function buildSaveIcon() {
        return domUtility.buildIcon('fas fa-save');
    }

    function removeCurrentMessage(cardNode, className = messageClass) {
        var currentMessage = cardNode.querySelector(`.${className}`);

        if (currentMessage) {
            currentMessage.remove();
        }
    }

    function buildNotSaved(cardNode) {
        removeCurrentMessage(cardNode);

        var newMessage = domUtility.buildNode('div', '', [
            { key: 'class', value: `${messageClass} ${notSavedClass}` }
        ]);

        newMessage.appendChild(buildSaveIcon());
        cardNode.appendChild(newMessage);
    }

    function buildSaveError(cardNode) {
        removeCurrentMessage(cardNode);

        var newMessageText = '⚠️  image url cannot be blank';
        var newMessage = domUtility.buildNode('div', newMessageText, [
            { key: 'class', value: `${messageClass} ${saveErrorClass}` }
        ]);

        cardNode.appendChild(newMessage);
        console.warn(`🦉 ${cardNode.id} cannot save with a blank src attribute on .artwork selector`)

        setTimeout(function() {
            removeCurrentMessage(cardNode, saveErrorClass);
            buildNotSaved(cardNode);
        }, msUntilExpiration);
    }

    function buildSaved(cardNode) {
        removeCurrentMessage(cardNode, notSavedClass)

        var newMessage = domUtility.buildNode('div', '', [
            { key: 'class', value: `${messageClass} ${savedClass}` }
        ]);

        newMessage.appendChild(buildSaveIcon());
        cardNode.appendChild(newMessage);

        setTimeout(function() {
            removeCurrentMessage(cardNode, savedClass);
        }, msUntilExpiration);
    }


    return {
        buildNotSaved: buildNotSaved,
        buildSaved: buildSaved,
        buildSaveError: buildSaveError,
        removeCurrentMessage: removeCurrentMessage
    }
})();