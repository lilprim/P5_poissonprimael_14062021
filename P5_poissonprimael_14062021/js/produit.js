// On récupère les paramètres passés dans l'url de la page
let param = (new URL(document.location)).searchParams;
// On récupère la valeur du paramètre id, qui va nous permettre de traiter le bon produit
let id = param.get('id');
// On met dans une variable l'adresse qui nous permettra de récupérer les infos du produit
const getProduitAPI = 'http://localhost:3000/api/cameras/'+id;

/* Fonction qui s'éxécute toute seule au chargement de la page */

(async function () {
    // On affecte à la variable produit, la valeur retournée par la fonction getProduit
    // Le await permet d'attendre que le produit demandé en paramètre soit récupéré pour passer à la ligne suivante
    const produit = await getProduit()
    // Cette fonction permet d'affiche le produit qu'on lui passe en paramètre   
    afficheProduit(produit)
})()

/* Fonction de récupération d'un produit */

async function getProduit() {
    // On affecte à la variable response, l'id du produit passé en paramètre dans l'url
    // Le await permet d'attendre que le serveur nous ait répondu pour passer à la ligne suivante
    let response = await fetch(getProduitAPI)
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

/* Fonction d'affichage du produit */

function afficheProduit(data) {
    // On cible la div dans laquelle on veut afficher le produit, et on l'affecte à la variable divProduit
    const divProduit = document.getElementById('camera');
    // On instancie une variable qui contient tout le code html que l'on veut insérer dans la page HTML
    let vignette =
        `<div class="col-12"><h1 class="detail-produit__titre">${data.name}</h1></div>
        <div class="col-12 mb-4">
            <div class="carte card h-100">
                <img id="product_img" class="card-img-top" src="${data.imageUrl}" alt="Appareil photo ${data.name}">
                <div class="card-body text-center">
                    <p>${data.description}</p>
                    <p class="d-flex justify-content-center">${data.price / 100}.00 €</p>
                    <label for="selectlenses">Choisissez votre optique : </label>
                    <select id="selectlenses"></select>  
                    <hr>
                    <button class="btn btn-info" id="boutonajout">Ajouter au panier</button>
                </div>
            </div>
        </div>`;
    // On insère le contenu de vignette à l'emplacement prévu dans la page HTML
    divProduit.innerHTML = vignette
    // On cible le select qui a été créé vide
    const select = document.getElementById("selectlenses")
    // On boucle sur les options disponibles pour cet article
    for (i = 0; i < data.lenses.length; i++) 
    {
        // On crée un élément html <option>
        const selectOption = document.createElement('option');
        // On l'intègre dans le select
        select.appendChild(selectOption);
        // On lui insère le nom de l'option
        selectOption.textContent = data.lenses[i];
        // On rempli l'élément value, qui servira à récupérer la couleur choisie
        selectOption.setAttribute("value", data.lenses[i]);
    }
    
    /* On défini ce qui se passe lorsqu'on clique sur le bouton "ajouter au panier" */

    // On cible le bouton sur lequel on appuie pour ajouter un produit au panier, et on l'affecte à la variable bouton
    const bouton = document.getElementById("boutonajout");
    // On écoute le bouton et on execute le code suivant quand un click se produira
    bouton.addEventListener("click", function (event) {
        event.preventDefault();
        // On stocke toutes les infos de l'article choisi dans la variable articlechoisi
        let articlechoisi = {
            id : data._id,
            nom : data.name,
            lentille : select.value,
            prix : data.price,
            image : data.imageUrl,
            quantite : 1
        }
        // Si le local storage est vide, la variable panier s'instancie sous la forme d'un tableau vide
        if(panier == null) panier = [];
        // La variable existant changera de valeur si un article identique à celui que l'on a choisi est deja présent dans le panier
        let existant = 0
        // On boucle sur tous les articles présents dans le panier
        panier.forEach((article) => {
            // Si un article identique est déjà présent, on incrémente la quantité de 1 au lieu d'ajouter une nouvelle ligne
            // On augmente aussi le prix du pour cet article
            // On met la variable existant à 1 , ce qui permettra de ne pas insérer une nouvelle ligne après cette boucle
            if(article.id == articlechoisi.id && article.lentille == articlechoisi.lentille)
            {
                article.quantite+=1
                article.prix+=articlechoisi.prix
                existant = 1
            } 
        })
        // Si aucun article existant n'a été décelé, on ajoute l'article au panier
        if(existant == 0) panier.push(articlechoisi);  
        // On transforme en chaine de caractère la variable panier     
        panierstring = JSON.stringify(panier)
        // On stocke le panier ainsi transformé en local storage
        localStorage.setItem('panier', panierstring)
        // On recharge la page
        window.location.reload()
    })
}