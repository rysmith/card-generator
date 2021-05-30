document.addEventListener('DOMContentLoaded', function() {
    addEnterSubmitListener();
    search.addHandler();
    card.buildCardNodes();
    card.clearInputs([document.getElementById('search')])

});

function addEnterSubmitListener() {
    document.getElementById('content').addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            card.generateCard();
        }
    });
}