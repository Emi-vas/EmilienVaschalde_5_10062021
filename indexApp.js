main()

async function main() {
    
    const articles = await getArticles() //on reccup les articles
    articlesStorage(articles) //met les article dans le Local Storage
    
    const main = document.getElementById("main")
    
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

    //Pour mettre un espace dans le prix
    function normPrice(bigPrice) { 

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

function articlesStorage(articles) {
    let articlesJson = JSON.stringify(articles)
    localStorage.setItem('articles', articlesJson)
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
                console.log("erreur lié au back")
             });
} 



