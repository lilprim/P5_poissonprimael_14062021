// Définition des routes qui permettent d'interroger le serveur
const urlAPIpost = 'http://localhost:3000/api/cameras/order';


// Instanciation de la variable qui stocke le contenu du panier
const panierstorage = JSON.parse(localStorage.getItem('panier'));
let panier = []
let nbpanier = 0

// Si le panier en local storage n'existe pas ou est vide
if (panierstorage === null || panierstorage.length == 0) {
    // Le panier est vide
    panier = [];
    // Le nombre d'articles dans le panier est de 0
    nbPanier = 0;
    // Si le panier en local storage exite et contient quelque chose
} else {
    // Le panier contient tous les articles dans le local storage 
    panier = panierstorage;
    // Le nombre d'articles dans le panier est le même que dans le local storage

    nbPanier = panier.length
    // On affiche en flex l'indication du nombre d'articles dans le panier
    document.getElementById("nbPanier").style.display = "flex";
    // On y insère le nombre d'articles présents dans le panier
    document.getElementById("nbPanier").textContent = nbPanier;
}
