// On met dans une variable l'adresse qui nous permettra de récupérer tous les produits
const getProduitsAPI = 'http://localhost:3000/api/cameras';

/* Fonction qui s'éxécute toute seule au chargement de la page */

(async function () {
    // On affecte à la variable produits, la valeur retournée par la fonction getProduits
    // Le await permet d'attendre que les produits soient récupérés pour passer à la ligne suivante
    const produits = await getProduits()
    // Cette fonction permet d'afficher les produits qu'on lui passe en paramètre   
    afficheProduits(produits)
})()

/* Fonction de récupération des produits */

async function getProduits() {
    // On affecte à la variable response, ce que retourne le serveur quand on lui demande la liste des produits
    // Le await permet d'attendre que le serveur nous ait répondu pour passer à la ligne suivante
    let response = await fetch(getProduitsAPI)
    // On affecte à la variable data la réponse formatée en json, ce qui permet de l'exploiter par la suite
    // Le await permet d'attendre que le serveur nous ait répondu pour passer à la ligne suivante
    let data = await response.json()
        // En cas d'erreur , on alerte
        .catch((error) => {
            alert("Connexion au serveur impossible")
        })
    // On retourne les données formatées
    return data
}

/* Fonction d'affichage des produits */

function afficheProduits(produits) {
    // On cible la div dans laquelle on veut afficher les produits, et on l'affecte à la variable divProduits
    const divProduits = document.getElementById('cameras');
    // On boucle sur chaque produit trouvé dans le tableau produits
    produits.forEach((produit) => {
        // On instancie une variable qui contient tout le code html que l'on veut insérer dans la page HTML
        let vignette = 
        `<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4">
            <a href="produit.html?id=${produit._id}">
                <div class="card carte">
                    <img class="card-img-top p-1" src="${produit.imageUrl}" alt="Appareil photo ${produit.name}">
                    <div class="card-body text-center">
                        <h2 class="card-title h4">${produit.name}</h2>
                        <p class="card-subtitle">${produit.price/100}.00 €</p>
                        <button class="btn btn-info mx-auto mt-4 bouton-voir-produit">Voir le produit</button>
                    </div>
                </div>
            </a>
        </div>`;
        // On insère le contenu de vignette à l'emplacement prévu dans la page HTML
        // Le += permet d'ajouter du contenu à divProduits sans effacer le précédent
        divProduits.innerHTML += vignette
    })
}