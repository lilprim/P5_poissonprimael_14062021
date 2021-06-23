let params = (new URL(document.location)).searchParams;
let id = params.get('id');



(async function () {
    let produit = await getProduit(id)
    afficheProduit(produit)
})()


async function getProduit(id){
    let response = await fetch(`${urlAPIget}/${id}`)
    let data = await response.json()
    .catch((error) => {
        alert("Connexion au serveur impossible")
    })
    console.log(data)
    return data
}


function afficheProduit(data) {
    const divProduits = document.getElementById('teddys')
     //on affiche

        let vignette =
        `<div class="col-12"><h1 class="detail-produit__titre">${data.name}</h1></div>
        <div class="col-12 mb-4">
            <div class="carte card h-100">
                <img id="product_img" class="card-img-top" src="${data.imageUrl}" alt="Appareil photo ${data.name}">
                <div class="card-body text-center">
                    <p>${data.description}</p>
                    <p id="product_price" class="d-flex justify-content-center">${data.price / 100}.00 €</p>
                    <label for="selectcouleur">Choisissez votre couleur : </label>
                    <select id="selectcouleur"></select>  
                    <hr>
                    <button class="btn btn-info" id="boutonajout">Ajouter au panier</button>
                </div>
            </div>`

        
        divProduits.innerHTML += vignette    

        const select  = document.getElementById("selectcouleur");
        for(i = 0;  i < data.colors.length; i++)
        {
            const selectOption = document.createElement('option');
            select.appendChild(selectOption)
            selectOption.textContent = data.colors[i]
            selectOption.setAttribute("value", data.colors[i])

        }
}