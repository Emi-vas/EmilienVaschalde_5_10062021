main()

async function main() {
    
    const articles = await getArticles() //on reccup les articles
    articlesStorage(articles) //met les articles dans le Local Storage

    let qteArticle = localStorage.getItem('qteArticle')
    
    const main = document.getElementById("main")
    
    for (i = 0; i < articles.length; i++) {

        let image = articles[i].imageUrl
        let nom = articles[i].name      
        let prix = articles[i].price / 100

    
        main.innerHTML += `
        <a href="article.html" onclick="setLid(${i})" id="templateArticle">
        <div class="bloc">
            <div class="bloc__image" id="articleImg"><img src="${image}" alt=""></div>

            <div class="bloc__titre" id="articleTitre">
                <p>${nom}</p>
            </div>

            <div class="bloc__prix" id="articlePrix">
                <p>${prix} €</p>
            </div>
        </div>
        </a>`
    }

    // affiche le nombre à coté de panier
    if (qteArticle != null && qteArticle != 0) {
        document.getElementById("qtePanier").innerText = ` (${qteArticle})`
    }
    
}


//------------------------------- FONCTIONS ------------------------------------------//
// on envoi dans le LS l'indice de l'article sur lequel on a cliqué
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
