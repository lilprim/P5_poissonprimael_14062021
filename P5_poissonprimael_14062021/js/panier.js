/* Fonction d'affichage du contenu du panier */

function affichePanier(panier) {
    // On affecte le contenu de #panier à la variable contenupanier
    let contenupanier = document.getElementById('panier');
    // On affecte le contenu de #sectionform à la variable formulairepanier
    let formulairepanier = document.getElementById('sectionform');
    // Si le panier est vide
    if(panier.length == 0)
    {
        // On rempli #panier avec ce code HTML
        let textepanier = 
            '<div class="col-12 text-center mt-2">Votre panier est vide</div>'+
            '<div class="col-12 text-center mt-4"><a href="index.html"><button class="btn btn-info">Continuer vos achats</button></a></div>'
        contenupanier.innerHTML += textepanier
        // On cache le formulaire
        formulairepanier.style.display = "none"
    }
    // Si le panier comporte au moins un article 
    else 
    {
        // On insère l'entête d'un tableau dans la variable textepanier
        let textepanier = '<table class="col-12 text-center mt-2 table-bordered"><tr><th class="d-none d-sm-block"></th><th>Désignation</th><th>Qte</th><th>Prix</th><th></th></tr>'
        // On instancie une variable i qui permettra de définir l'ordre de l'article dans le panier
        let i = 0
        // On initialise la variable totalPanier à 0, elle contiendra le prix total de tous les produits
        let totalPanier = 0
        // On boucle sur chaque produit présent dans le panier
        panier.forEach((produit) => {
            // On insère une ligne dans le tableau de la variable textepanier
            textepanier += `<tr>
                <td class="p-2 d-none d-sm-block"><img src="${produit.image}" class="vignettePanier"></td>
                <td><a href="produit.html?id=${produit.id}" target="_self">${produit.nom} - ${produit.lentille}</a></td>
                <td>${produit.quantite}</td>
                <td>${produit.prix/100}.00 €</td>
                <td><i class="fas fa-trash-alt supprimerarticle" data-index="${i}"></i></td>
            </tr>`
            // On incrémente i
            i++
            // On ajoute le prix de la ligne au prix total
            totalPanier+= produit.prix
        })
        // On ferme le tableau de la variable textepanier
        textepanier += '</table>'
        // On affiche le montant total des articles du panier
        textepanier += `<div class="col-12 text-center mt-4">Montant total : ${totalPanier/100}.00 €</div>`
        // On affiche un bouton permettant de vider la totalité du panier
        textepanier += '<div class="col-12 text-center mt-4"><button id="supprimertout" class="btn btn-danger">Vider le panier<i class="fas fa-trash-alt"></i></button></div>'
        // On ajoute la variable panier au contenu de #panier
        contenupanier.innerHTML += textepanier
    }
}

/* On execute la fonction affichePanier() en lui passant le panier en paramètre */

affichePanier(panier);

/* Prise en compte des boutons permettant de retirer un article du panier */

// On affecte à la variable boutonSuppArticle, les boutons ayant la classe ("supprimerarticle")
let boutonsSuppArticle = document.getElementsByClassName('supprimerarticle');
// On boucle sur tous les boutons de suppression
for (let i = 0; i < boutonsSuppArticle.length; i++)
{
    // On écoute chacun des boutons de suppression et on execute le code suivant quand un click se produira
    boutonsSuppArticle[i].addEventListener("click", function (event) {
        event.preventDefault();
        // On récupère la valeur de data-index
        let index = this.dataset.index
        // On supprime l'entrée correspondante dans le panier
        panier.splice(index, 1)
        // On remet à jour le panier dans le local storage et on rafraichit la page
        localStorage.setItem('panier', JSON.stringify(panier))
        window.location.reload()
    })    
}

/* Prise en compte du bouton permettant de vider tout le panier */

// On affecte à la variable boutonSuppTout, le bouton qui permet de vider tout le panier
const boutonsSuppTout = document.getElementById('supprimertout');
// On écoute ce bouton de suppression et on executera le code suivant quand un click se produira
boutonsSuppTout.addEventListener("click", function (event) {
    event.preventDefault();
    // On supprime le panier du local storage
    localStorage.removeItem('panier')
    // On recharge la page
    window.location.reload()
})

/* Check en temps réeel des saisies du formulaire  */

// On affecte à la variable form, le formulaire utilisateur de la page panier
const form = document.getElementById("form");

// On check chaque modification du formulaire pour savoir si on active le bouton validation, tout se fait donc en temps réel
addEventListener("input", function(e) {
    // On appelle la fonction qui va tester si le formulaire est valide
    let checkForm = testFormulaire()
    // Si aucune erreur n'est trouvée, on rend cliquable le bouton de validation du formulaire
    if (checkForm == 0)
    {
        document
            .getElementById("valideFormulaire")
            .removeAttribute("disabled")
    // Si on a trouvé une erreur, on rend le bouton non cliquable
    } else {
        document
            .getElementById("valideFormulaire")
            .setAttribute("disabled", false);
    }
})

/* Fonction qui permet de tester chaque champ du formulaire 
On regarde la validité de chaque élément
Si un élément est invalide, on retourne 1
Si tout se passe bien, on retourne 0*/

function testFormulaire() {
    let lastName = document.getElementById('lastName')
	let firstName = document.getElementById('firstName')
	let address = document.getElementById('address')
	let city = document.getElementById('city')
	let email = document.getElementById('email')
    if (!lastName.checkValidity()) return 1;
    if (!firstName.checkValidity()) return 1;
    if (!address.checkValidity()) return 1;
    if (!city.checkValidity()) return 1;
    if (!email.checkValidity()) return 1;
    return 0;
}

/* Validation du formulaire */

// On affecte à la variable boutonValidationFormulaire, le bouton de validation du formulaire
let boutonValidationFormulaire = document.getElementById('valideFormulaire');
// On écoute si le bouton est cliqué, si c'est le cas, on execute le code ci-dessous
boutonValidationFormulaire.addEventListener("click", function (event) {
    event.preventDefault();
    // On met toutes les données saisies dans le formulaire, dans un objet contact
    let lastName = document.getElementById('lastName')
	let firstName = document.getElementById('firstName')
	let address = document.getElementById('address')
	let city = document.getElementById('city')
	let email = document.getElementById('email')  
    let contact = {
        lastName: lastName.value,
        firstName: firstName.value,
        email: email.value,
        city: city.value,
        address: address.value
    };
    // On instancie un tableau products à vide
    let products = []
    // On instancie le montant total des articles du panier à 0
    let totalPanier = 0
    // Pour chaque produit présent dans le panier, On rempli un tableau products avec les id des articles, on calcule aussi le total du panier
    panier.forEach((produit) => {
        products.push(produit.id)
        totalPanier+= produit.prix
    })
    // On stocke l'objet contact et le tableau products dans une variable que l'on va passer au serveur
    infosCommande = { contact, products };
    let params = {
        method: "POST",
        body: JSON.stringify(infosCommande),
        headers: { "Content-type": "application/json" }
    };
    // On appelle la route du serveur en utilisant les paramètres définis et la variable contenant nos informations
    fetch(urlAPIpost, params)
        .then(response => response.json())
        // On stocke la réponse dans un objet commande
        .then(function (commande) {
            // On récupère le numero de commande renvoyé par le serveur
            let orderId = commande.orderId
            // On fait une variable recapitulatif qui contient l'orderId et le montant total à payer
            let recapitulatif = {orderId, totalPanier}
            // On stocke cette variable dans le local storage
            localStorage.setItem("commande", JSON.stringify(recapitulatif))
            // On supprime le panier stocké dans le local storage
            localStorage.removeItem('panier')
            // On redirige vers la page de confirmation
            window.location = "confirmation.html";
        })
        .catch(error => {
            alert("Connexion au serveur impossible")
        });    
})