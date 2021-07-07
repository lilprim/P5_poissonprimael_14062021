// On récupère la commande stockée dans le local storage
const commande = JSON.parse(localStorage.getItem('commande'));

/* Fonction pour afficher la confirmation de commande */

function afficheConfirmation(commande) {

    // On cible l'element dans lequel on veut afficher la confirmation de commande, et on l'affecte à la variable confirmation
    let confirmation = document.getElementById('confirmation');
    // On met tout le texte que l'on veut afficher dans une variable texteConfirmation
    let texteConfirmation = ` 
        <div class="col-12 text-center mt-3">Votre commande <span class="font-weight-bold">${commande.orderId}</span> a bien été prise en compte</div>
        <div class="col-12 text-center mt-4">Un montant de <span class="font-weight-bold">${commande.totalPanier/100}.00 €</span> vous sera débité à l'expédition</div>
        <div class="col-12 text-center mt-5">Tout l'équipe d'Orinoco vous remercie</div>
        `
    // On insère tout le contenu de cette variable dans #confirmation, afin de l'afficher sur la page confirmation.html
    confirmation.innerHTML = texteConfirmation
}

// On appelle la fonction d'affichage de la confirmation
afficheConfirmation(commande)