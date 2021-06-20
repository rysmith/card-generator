document.addEventListener('DOMContentLoaded', function() {
    addEnterSubmitListener();
    search.addInputHandler();
    card.buildCards();
    card.clearInputs([document.getElementById('search')])
});

function addEnterSubmitListener() {
    document.getElementById('content').addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            card.buildNewCard();
        }
    });
}