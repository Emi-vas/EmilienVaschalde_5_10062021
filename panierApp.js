main()

async function main() {
    const articles = await getArticles()
    const commandeHtml = await document.getElementById("commande")
    
    for (i = 0; i < articles.length; i++) {
        let qte = localStorage.getItem(i)

        if (qte != null && commandeHtml != null) {
            const titre = articles[i].name
            const prixBig = articles[i].price * qte
            const prix = normPrice(prixBig)

            commandeHtml.innerHTML +=
            `<div class="commande__ligne">
            <div>
                <p id="titre">${titre}<span id="lentille">Lentille : TRd 250xp</span> </p>
            </div>

            <div class="commande__ligne__qte">
                <div id="plus">+</div>
                <div id="qte">${qte}</div>
                <div id="moins">-</div>
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