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

        <a href="panier.html" class="commande__ligne__del" onclick="clearLine(${i})">
            <p id="del"><i class="far fa-trash-alt"></i></p>
        </a>
        </div>`
    }
}

function clearStorage() {
    localStorage.clear()
}

function clearLine(i) {
    // on enlève la qte de cet article au nb d'article global
    let qte = localStorage.getItem(i)
    let qteArticle = localStorage.getItem('qteArticle')
    qteArticle = qteArticle - qte
    localStorage.setItem("qteArticle", qteArticle)

    //on supprim l'article
    localStorage.removeItem(i)
}

function plus(i) {
    let qte = localStorage.getItem(i)
    qte++
    localStorage.setItem(i, qte)

    let qteArticle = localStorage.getItem('qteArticle')
    qteArticle++
    localStorage.setItem('qteArticle', qteArticle)
}

function moins(i) {
    let qte = localStorage.getItem(i)
    qte--
    if (qte == 0) {
        localStorage.removeItem(i)
    }else {
        localStorage.setItem(i, qte)
    }

    let qteArticle = localStorage.getItem('qteArticle')
    qteArticle--
    localStorage.setItem('qteArticle', qteArticle)
}