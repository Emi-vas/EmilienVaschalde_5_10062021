window.onload = function() {
    main()
}


function main() {

    let panier = localStorage.getItem("panier")
    if (panier != null) {
        panier = JSON.parse(panier)
        affichePanier(panier)
    }
}


function affichePanier(panier) {
    const commandeHtml =  document.getElementById("commande")
    for (i in panier) {
        const titre = panier[i].nom
        let qte = panier[i].qte
        const prix = panier[i].prix * qte
        const lentille = panier[i].lentille

        commandeHtml.innerHTML +=
        `<div class="commande__ligne">
        <div>
            <p id="titre">${titre}<span id="lentille">${lentille}</span> </p>
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


    }
}

function clearStorage() {
    localStorage.clear()
}

function clearLine(i, qte) {
    // on enlève la qte de cet article au nb d'article global
    let qteArticle = localStorage.getItem('qteArticle')
    qteArticle = qteArticle - qte
    localStorage.setItem("qteArticle", qteArticle)

    //on supprim l'article
    let panier = getPanier()
    panier.splice(i)
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
        panier.splice(i)
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