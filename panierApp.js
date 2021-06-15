window.onload = function() {
    main()
}


async function main() {
    const articles = getArticles()
    const commandeHtml =  document.getElementById("commande")

    
    for (i = 0; i < articles.length; i++) {
        let qte = localStorage.getItem(i)
        console.log(qte)

        if (qte != null) {

            const titre = articles[i].name
            const prixBig = articles[i].price * qte
            console.log(prixBig)
            const prix = normPrice(prixBig)

            commandeHtml.innerHTML +=
            `<div class="commande__ligne">
            <div>
                <p id="titre">${titre}<span id="lentille">Lentille : TRd 250xp</span> </p>
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



    function normPrice(bigPrice) { //Pour mettre un espace dans le prix

        if (bigPrice < 1000) {
            return bigPrice
        } else if (bigPrice <1000000) {
            let arg1 = Math.trunc(bigPrice / 1000)  // 8
            let arg2 = bigPrice - arg1 * 1000 
            if (arg2 == 0) {
                arg2 = "000"
            }
            return arg1 + " " + arg2
        } else {
            let arg1 = Math.trunc(bigPrice / 1000000)  // 8
            let argTemp = bigPrice - arg1 * 1000000
            let arg2 = Math.trunc(argTemp / 1000)  // 8
            let arg3 = bigPrice - arg1 * 1000000 - arg2 * 1000

            if (arg2 == 0) {
                arg2 = "000"
            }

            if (arg3 == 0) {
                arg3 = "000"
            }

            return arg1 + " " + arg2 + " " + arg3
        }
    }
}



function getArticles() {
    const articlesJson = localStorage.getItem('articles')
    const articles = JSON.parse(articlesJson)
    return articles
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