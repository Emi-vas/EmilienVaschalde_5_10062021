main()

async function main() {
    
    const articles = await getArticles() //on reccup les articles
    const main = document.getElementById("main")
    const template = document.getElementById("templateArticle")

    // let titre = articles[0].name

    
    
    for (i = 0; i < articles.length; i++) {

        let image = articles[i].imageUrl
        let nom = articles[i].name      
        let prix = normPrice(articles[i].price)
        
    
        main.innerHTML += `
        <a href="article.html" onclick="setLid(${i})" id="templateArticle">
        <div class="bloc">
            <div class="bloc__image" id="articleImg"><img src="${image}" alt=""></div>

            <div class="bloc__titre" id="articleTitre">
                <p>${nom}</p>
            </div>

            <div class="bloc__prix" id="articlePrix">
                <p>${prix}</p>
            </div>
        </div>
        </a>`
    }


    function normPrice(bigPrice) { //Pour mettre un espace dans le prix

        if (bigPrice < 1000) {
            return bigPrice
        } else if (bigPrice <1000000) {
            let arg1 = Math.trunc(bigPrice / 1000)  // 8
            let arg2 = bigPrice - arg1 * 1000 
            return arg1 + " " + arg2 + " €"
        } else {
            return "Soyons serieux"
        }
    }


}


//------------------------------- FONCTIONS ------------------------------------------//
function setLid(i){
    localStorage.setItem('itemId', i)
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



