document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("menu-item-31");
    var modalCloseButton = document.getElementsByClassName("modal__user__button")[0];
    //ouveture de la modale via le bouton contact du menu nav
    btn.onclick = function() {
        modal.style.display = "block";
    }
    //fermeture de la modale via le bouton envoyer de la modale
    modalCloseButton.onclick = function() {
        modal.classList.add("fade-out");
        setTimeout(function() {
            modal.style.display = "none";
            modal.classList.remove("fade-out");
        }, 500);
    }

});
