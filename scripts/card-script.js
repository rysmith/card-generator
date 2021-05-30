document.addEventListener("DOMContentLoaded", function() {
    addEnterSubmitListener();
    search.addHandler();
    cardStorage.getCardsFromStorage();
    card.clearInputs([document.getElementById('search')])

});

function addEnterSubmitListener() {
    document.getElementById('content').addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            card.generateCard();
        }
    });
}