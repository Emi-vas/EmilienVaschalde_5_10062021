window.onload = function() {
    main()
}


function main() {

    let panier = localStorage.getItem("panier")
    panier = JSON.parse(panier)
    

    if (panier != null && panier.length >= 1) {
        affichePanier(panier)
        afficheBouton("Valider le panier")
        
    } else {
        const commandeHtml =  document.getElementById("commande")
        commandeHtml.innerText = "Panier vide"
    }

    //Ecoute le bouton valider
    document.getElementById("panierButton").addEventListener("click", function() {
        
        afficheForm() //on affiche le formulaire
        verifForm()
    })
}


function afficheForm() {
    //efface le panier
    document.getElementById("commande").classList.add("displayNone")

    //efface le bouton
    document.getElementById("panierButton").classList.add("displayNone")

    //met le prix au centre
    document.getElementById("panierTotal").classList.add("flexCenter")

    //bouton retour
    document.getElementById("retourClick").parentElement.classList.remove("displayNone")

    //affiche le formulaire
    document.getElementById("form").classList.remove("displayNone")
}

function afficheBouton(texteBouton) {
    let button = document.getElementById("panierButton")

    button.classList.remove("displayNone")
    button.children[0].innerText = texteBouton //button c'est la div le .children permet de cibler le boutton
}

function affichePanier(panier) {
    const commandeHtml =  document.getElementById("commande")
    let total = 0
    for (i in panier) {
        const titre = panier[i].nom
        let qte = panier[i].qte
        const prix = panier[i].prix * qte
        const lentille = panier[i].lentille

        total = total + prix

        commandeHtml.innerHTML +=
        `<div class="commande__ligne">
        <div class="commande__ligne__titre">
            <p id="titre">${titre}<div id="lentille">${lentille}</div> </p>
        </div>

        <div class="commande__ligne__qte">
            <a href="panier.html" onclick="plus(${i})" id="plus">+</a>
            <div id="qte">${qte}</div>
            <a href="panier.html" onclick="moins(${i})" id="moins">-</a>
        </div>

        <div class="commande__ligne__prix">
            <p>${prix} €</p>
        </div>

        <a href="panier.html" class="commande__ligne__del" onclick="clearLine(${i}, ${qte})">
            <p id="del"><i class="far fa-trash-alt"></i></p>
        </a>
        </div>`

        afficherTotal(total)
    }
}


function clearLine(i, qte) {
    // on enlève la qte de cet article au nb d'article global
    let qteArticle = localStorage.getItem('qteArticle')
    qteArticle = qteArticle - qte
    localStorage.setItem("qteArticle", qteArticle)

    //on supprim l'article
    let panier = getPanier()
    panier.splice(i, 1)
    setPanier(panier)
}

function plus(i) {
    let panier = getPanier()
    panier[i].qte ++
    setPanier(panier)
    

    let qteArticle = localStorage.getItem('qteArticle')
    qteArticle++
    localStorage.setItem('qteArticle', qteArticle)
}

function moins(i) {
    let panier = getPanier()
    panier[i].qte --

    if (panier[i].qte == 0) {
        panier.splice(i, 1)
    }
    setPanier(panier)

    let qteArticle = localStorage.getItem('qteArticle')
    qteArticle--
    localStorage.setItem('qteArticle', qteArticle)
}

function getPanier() {
    let panier = localStorage.getItem("panier")
    panier = JSON.parse(panier)
    return panier
}

function setPanier(panier) {
    panier = JSON.stringify(panier)
    localStorage.setItem("panier", panier)
}

function afficherTotal(total) {
    document.getElementById("total").innerText = total
}