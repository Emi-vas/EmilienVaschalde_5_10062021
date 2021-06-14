main()

async function main() {
    const articles = await getArticles()
    
    for (i = 0; i < articles.length; i++) {
        let qte = localStorage.getItem(i)
        const commandeHtml = document.getElementById("commande")

        if (qte != null) {
            const titre = articles[i].name
            const prixBig = articles[i].price * qte
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

            <a href="panier.html" class="commande__ligne__del" onclick="clearStorage()">
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
            return arg1 + " " + arg2
        } else {
            return "Soyons serieux"
        }
    }
   
}



async function getArticles() {
    return fetch("http://localhost:3000/api/cameras")
             .then(function(res) {
                 if (res.ok) {
                     return res.json();
                 }
             })
             .then(function(value) {
                 return value;
             })
             .catch(function(err) {
 
             });
} 


function clearStorage() {
    localStorage.clear()
}

function plus(i) {
    let qte = localStorage.getItem(i)
    qte++
    localStorage.setItem(i, qte)
}

function moins(i) {
    let qte = localStorage.getItem(i)
    qte--
    if (qte == 0) {
        localStorage.removeItem(i)
    }else {
        localStorage.setItem(i, qte)
    }
    
}