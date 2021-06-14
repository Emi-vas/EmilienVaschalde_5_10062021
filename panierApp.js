window.onload = function() {
    main()
}


async function main() {
    const articles = await getArticles()
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

function clearLine(i) {
    localStorage.removeItem(i)
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